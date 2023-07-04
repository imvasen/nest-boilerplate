import { ConfigService } from '@api/common/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export const config = {
  port: 3000,
  environment: 'test',
  jwtSecret: 'testSecret',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class MockedConfigModule {}
