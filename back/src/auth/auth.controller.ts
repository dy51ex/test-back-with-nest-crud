import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UserDto } from './login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: RegisterDto })
  @Post('/login')
  async login(@Body() user: RegisterDto): Promise<{ access_token: string }> {
    try {
      return await this.service.login(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something wrong...',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBody({ type: RegisterDto })
  @Post('register')
  public async register(@Body() user: RegisterDto): Promise<UserDto> {
    try {
      return await this.service.create(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Email exist') {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: error.message,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something wrong...',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
