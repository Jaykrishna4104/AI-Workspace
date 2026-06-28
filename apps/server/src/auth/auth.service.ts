import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      10,
    );

    // Save user
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  async login(loginDto: LoginDto) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    // User not found
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Create JWT payload
    const payload = {
      sub: user.id,
      email: user.email,
    };

    // Generate JWT token
    const accessToken = await this.jwtService.signAsync(payload);

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login successful',
      accessToken,
      user: userWithoutPassword,
    };
  }
}