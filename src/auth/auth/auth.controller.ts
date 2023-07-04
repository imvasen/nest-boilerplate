import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { PasswordSignInDto, PasswordSignUpDto } from '@api/auth/auth/domain';
import { AuthService } from '@api/auth/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('sign-in/password')
  passwordSignIn(@Body() body: PasswordSignInDto) {
    try {
      return this.auth.passwordSignIn(body);
    } catch (error) {
      if (error.message === 'Bad credentials') {
        throw new HttpException(
          { message: error.message },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw error;
    }
  }

  @Post('sign-up/password')
  passwordSignUp(@Body() body: PasswordSignUpDto) {
    try {
      return this.auth.passwordSignUp(body);
    } catch (error) {
      if (error.message === 'User already exists') {
        throw new HttpException(
          { message: error.message },
          HttpStatus.CONFLICT,
        );
      }

      throw error;
    }
  }
}
