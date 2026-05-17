import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto';
import { User, UserRole } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: registerDto.role || UserRole.DEVELOPER,
    });

    // Log activity
    await this.usersService.logActivity(user.id, {
      type: 'USER_LOGIN',
      title: 'Account Created',
      description: 'New user account registered',
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    return {
      user: this.excludePassword(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // Validate user
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    // Log activity
    await this.usersService.logActivity(user.id, {
      type: 'USER_LOGIN',
      title: 'User Login',
      description: 'User logged in successfully',
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    return {
      user: this.excludePassword(user),
      ...tokens,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || user.status !== 'ACTIVE') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.excludePassword(user);
  }

  async updateProfile(
    userId: string,
    updateData: Partial<Pick<User, 'firstName' | 'lastName' | 'bio' | 'githubUsername' | 'avatar'>>,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.update(userId, updateData);
    return this.excludePassword(user);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });

    // Log activity
    await this.usersService.logActivity(userId, {
      type: 'USER_LOGIN',
      title: 'Password Changed',
      description: 'User password was updated',
    });
  }

  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Made with Bob
