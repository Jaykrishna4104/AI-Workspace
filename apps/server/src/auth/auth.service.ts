import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return {
      success: true,
      message: 'User registration endpoint is working!',
    };
  }
}