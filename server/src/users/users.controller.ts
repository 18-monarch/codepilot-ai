import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEAM_LEAD)
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 10;

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as any } },
            { firstName: { contains: search, mode: 'insensitive' as any } },
            { lastName: { contains: search, mode: 'insensitive' as any } },
          ],
        }
      : undefined;

    return this.usersService.findAll({
      skip: skipNum,
      take: takeNum,
      where,
    });
  }

  @Get('me')
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    return {
      data: user,
      statusCode: 200,
    };
  }

  @Get('me/activities')
  async getMyActivities(
    @Request() req,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const skipNum = skip ? parseInt(skip, 10) : 0;
    const takeNum = take ? parseInt(take, 10) : 20;

    const activities = await this.usersService.getActivities(req.user.userId, {
      skip: skipNum,
      take: takeNum,
    });

    return {
      data: activities,
      statusCode: 200,
    };
  }

  @Get('me/stats')
  async getMyStats(@Request() req) {
    const stats = await this.usersService.getStats(req.user.userId);
    return {
      data: stats,
      statusCode: 200,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

// Made with Bob
