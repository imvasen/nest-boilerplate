import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique('user_email', ['email'])
@Unique('user_username', ['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  async validatePassword(password: string): Promise<boolean> {
    if (this.password) {
      return bcrypt.compare(password, this.password);
    }

    return false;
  }

  hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  @BeforeInsert()
  async beforeInsert() {
    if (this.password) {
      this.password = this.hashPassword(this.password);
    }
  }
}
