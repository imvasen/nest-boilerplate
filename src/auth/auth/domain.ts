import { IsAlpha, IsEmail, IsString } from 'class-validator';

export class PasswordSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class PasswordSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;
}
