import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PasswordSignInDto, PasswordSignUpDto } from '@api/auth/auth/domain';
import { LoggerService } from '@api/common/logger';
import { UsersService } from '@api/auth/users';
import { User } from '@api/auth/models';

export interface JwtPayload {
  sub: string;
  iat: number;
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  private readonly logLabel = 'AuthService';

  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async signInResponse(user: User) {
    return {
      jwt: await this.getJwt(user),
      id: user.id,
      username: user.username,
    };
  }

  /**
   * Tries to sign in an already existing user through password.
   * @param credentials An object including email and password.
   * @returns An JWT token for the user.
   */
  async passwordSignIn({ email, password }: PasswordSignInDto) {
    const user = await this.users.getUser({ email });

    if (!user || !(await user.validatePassword(password))) {
      throw Error('Bad credentials');
    }

    this.logger.debug({
      context: this.logLabel,
      message: `Password sign in for ${user.email}`,
    });

    return this.signInResponse(user);
  }

  /**
   * Tries to create a user with the given data.
   * @param dto User data.
   * @returns The created user.
   * @throws An exception if the user already exists.
   */
  async passwordSignUp(dto: PasswordSignUpDto) {
    const user = await this.users.createUser(dto);

    this.logger.debug({
      context: this.logLabel,
      message: `User created: <${user.id}|${user.email}>`,
    });

    return user;
  }

  /**
   * Provides a JWT with the user data.
   * @param user User to convert JWT.
   * @returns JWT.
   */
  async getJwt(user: User) {
    const { id, username, email, firstName, lastName } = user;

    const payload: Omit<JwtPayload, 'sub' | 'iat'> = {
      id,
      username,
      email,
      firstName,
      lastName,
    };

    return this.jwt.sign(payload, { subject: `${user.id}` });
  }
}
