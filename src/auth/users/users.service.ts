import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DatabaseError } from 'pg';

import { LoggerService } from '@api/common/logger';
import { User } from '@api/auth/models';

@Injectable()
export class UsersService {
  private readonly logLabel = 'UsersService';

  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private readonly logger: LoggerService,
  ) {}

  async createUser(userSkeleton: Partial<User>) {
    const user = this.repository.create(userSkeleton);

    try {
      return await this.repository.insert(user).then(() => {
        this.logger.info({
          context: this.logLabel,
          message: `User created: ${user.id}`,
        });

        return user;
      });
    } catch (error) {
      if (error instanceof DatabaseError && error.code === '23505') {
        throw new Error('User already exists');
      }

      throw error;
    }
  }

  getUser({ id, email }: Partial<User>) {
    return this.repository.findOne({ where: { id, email } });
  }

  async updateUser(user: User, updateValue: Partial<User>) {
    if (updateValue.password) {
      updateValue.password = user.hashPassword(updateValue.password);
    }

    return this.repository.update({ id: user.id }, updateValue);
  }
}
