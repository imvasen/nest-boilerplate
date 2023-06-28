import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          port: 3000,
          environment: 'test',
        }),
      ],
    }),
  ],
})
export class MockedConfigModule {}
