import { Test, TestingModule } from '@nestjs/testing';
import { RongyunService } from './rongyun.service';

describe('RongyunService', () => {
  let service: RongyunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RongyunService],
    }).compile();

    service = module.get<RongyunService>(RongyunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
