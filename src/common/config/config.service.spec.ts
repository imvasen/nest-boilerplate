import { Test, TestingModule } from '@nestjs/testing';

import { MockedConfigModule } from '@test/mocked-config.module';
import { ConfigService } from '@api/common/config';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockedConfigModule],
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load some vars', () => {
    expect(service.isProduction).toEqual(false);
  });
});
