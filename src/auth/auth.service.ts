import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entity/User';

export interface JWTTokens {
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new HttpException('Email already registered!', 400);
    }

    // TODO: - save user
  }

  async login(loginDto: LoginDto): Promise<JWTTokens> {
    throw new Error('Method not implemented!');
  }

  async refreshTokens(token: string): Promise<JWTTokens> {
    throw new Error('Method not implemented!');
  }

  async logout() {}
}
