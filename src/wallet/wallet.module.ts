import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { walletProvider } from './wallet.providers';
import { LotteriesModule } from 'src/lotteries/lotteries.module';

@Module({
  controllers: [WalletController],
  providers: [WalletService, ...walletProvider],
  imports: [LotteriesModule]
})
export class WalletModule {}
