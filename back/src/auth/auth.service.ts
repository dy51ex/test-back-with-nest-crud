import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './login.dto';
import { RegisterDto } from './register.dto';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<UserDto> {
    const hash = crypto.createHash('sha1').update(password).digest('base64');
    const userData = await this.userService.findOne({
      email,
      password: hash,
    });
    if (!userData) {
      return null;
    }
    return { id: userData.id, username: userData.email };
  }

  public async login(user: RegisterDto): Promise<{ access_token: string }> {
    const userData = await this.validateUser(user.username, user.password);
    if (!userData) {
      throw new Error('User not found');
    }
    return {
      access_token: this.jwtService.sign({
        sub: userData.id,
        username: userData.username,
      }),
    };
  }

  public async create(user: RegisterDto): Promise<UserDto> {
    const isExist = await this.userService.findOne({ email: user.username });
    if (isExist) {
      throw new Error('Email exist');
    }
    const hash = crypto
      .createHash('sha1')
      .update(user.password)
      .digest('base64');
    const userWithEncryptedPassword = {
      email: user.username,
      password: hash,
    };
    const { id, email: username } = await this.userService.create(
      userWithEncryptedPassword,
    );
    return { id, username };
  }
}
