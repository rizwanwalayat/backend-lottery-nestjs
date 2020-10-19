import { Test, TestingModule } from '@nestjs/testing';
import { LotteriesController } from './lotteries.controller';

describe('LotteriesController', () => {
  let controller: LotteriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotteriesController],
    }).compile();

    controller = module.get<LotteriesController>(LotteriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
