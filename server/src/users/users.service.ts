import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User, UserRole, UserStatus, ActivityType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    githubUsername?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        role: data.role || UserRole.DEVELOPER,
        status: UserStatus.ACTIVE,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: any;
  }): Promise<{ users: User[]; total: number }> {
    const { skip = 0, take = 10, where } = params || {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        where,
        include: {
          team: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async update(
    id: string,
    data: Partial<Pick<User, 'firstName' | 'lastName' | 'bio' | 'githubUsername' | 'avatar' | 'password' | 'status'>>,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async logActivity(
    userId: string,
    activity: {
      type: ActivityType;
      title: string;
      description?: string;
      metadata?: any;
    },
  ): Promise<void> {
    await this.prisma.activityLog.create({
      data: {
        userId,
        type: activity.type,
        title: activity.title,
        description: activity.description,
        metadata: activity.metadata,
      },
    });
  }

  async getActivities(
    userId: string,
    params?: {
      skip?: number;
      take?: number;
    },
  ): Promise<any[]> {
    const { skip = 0, take = 20 } = params || {};

    return this.prisma.activityLog.findMany({
      where: { userId },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getStats(userId: string): Promise<any> {
    const [
      repositoriesCount,
      documentationsCount,
      testSuitesCount,
      debugSessionsCount,
    ] = await Promise.all([
      this.prisma.repository.count({ where: { userId } }),
      this.prisma.documentation.count({ where: { userId } }),
      this.prisma.testSuite.count({ where: { userId } }),
      this.prisma.debugSession.count({ where: { userId } }),
    ]);

    return {
      repositories: repositoriesCount,
      documentations: documentationsCount,
      testSuites: testSuitesCount,
      debugSessions: debugSessionsCount,
    };
  }
}

// Made with Bob
