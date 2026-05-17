import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      data: result,
      message: 'Registration successful',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      data: result,
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    const result = await this.authService.refreshToken(refreshToken);
    return {
      data: result,
      message: 'Token refreshed successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const result = await this.authService.getProfile(req.user.userId);
    return {
      data: result,
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateData: any) {
    const result = await this.authService.updateProfile(req.user.userId, updateData);
    return {
      data: result,
      message: 'Profile updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Request() req,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.authService.changePassword(req.user.userId, currentPassword, newPassword);
    return { message: 'Password changed successfully' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    // Log activity
    // In a real app, you might want to blacklist the token
    return { message: 'Logged out successfully' };
  }
}

// Made with Bob
