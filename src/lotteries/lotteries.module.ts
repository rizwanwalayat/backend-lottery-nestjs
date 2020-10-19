import { Module } from '@nestjs/common';
import { LotteriesController } from './lotteries.controller';
import { LotteriesService } from './lotteries.service';
import { lotteryProvider, lotteryPurchaseProvider } from './lotteries.providers';

@Module({
  controllers: [LotteriesController],
  providers: [LotteriesService, ...lotteryProvider, ...lotteryPurchaseProvider],
  exports: [LotteriesService]
})
export class LotteriesModule {}
