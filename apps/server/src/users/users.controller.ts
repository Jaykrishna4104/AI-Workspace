import {
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return {
      success: true,
      message: 'Protected route accessed successfully',
      user: req.user,
    };
  }
}