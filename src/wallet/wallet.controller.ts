import { Controller, Get, Post, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { currentUser } from 'src/core/decorators/user.decorator';
import { User } from 'src/users/user.entity';
import { WalletService } from './wallet.service';
import { WalletBalance } from './wallet-balance.entity';
import { AuthGuard } from '@nestjs/passport';
import { LotteryPurchaseDto } from 'src/lotteries/dto/lottery-purchase.dto';
import { LotteryPurchase } from 'src/lotteries/lottery-purchase.entity';
import { LotteriesService } from 'src/lotteries/lotteries.service';

@UseGuards(AuthGuard('jwt'))
@Controller('wallet')
export class WalletController {
    constructor(private walletService:WalletService, private lotteriesService: LotteriesService){}
    @Get()
    async getWallet(@currentUser() user:User):Promise<WalletBalance>{
        const wallet = await this.walletService.getWalletBalance(user.id);

        if (!wallet){
            throw new NotFoundException('Walled Not Found')
        }
        return wallet; 
    }

    @Post()
    async purchaseWithWallet(@currentUser() user:User, @Body() lotteryPurchase: LotteryPurchaseDto):Promise<LotteryPurchase>{
        const walletOrStripe = 'wallet';
        const lotteryPurchased = await this.lotteriesService.createPurchase(lotteryPurchase, user.id, walletOrStripe);
        const wallet = await this.walletService.getWalletBalance(user.id);
        const balance = wallet.balance - lotteryPurchase.totalAmount;
        const {numberOfAffectedRows} = await this.walletService.update(balance, user.id);
        return lotteryPurchased;


    }

}
