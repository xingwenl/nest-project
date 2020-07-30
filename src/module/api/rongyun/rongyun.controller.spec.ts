import { Test, TestingModule } from '@nestjs/testing';
import { RongyunController } from './rongyun.controller';

describe('Rongyun Controller', () => {
  let controller: RongyunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RongyunController],
    }).compile();

    controller = module.get<RongyunController>(RongyunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
