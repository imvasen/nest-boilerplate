import { Test, TestingModule } from '@nestjs/testing';

import { LoggerService } from '@api/common/logger/logger.service';
import { MockedConfigModule } from '@test/mocked-config.module';
import { ConfigService } from '@api/common/config';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockedConfigModule],
      providers: [ConfigService, LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
