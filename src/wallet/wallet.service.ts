import { Injectable, Inject } from '@nestjs/common';
import { WalletBalance } from './wallet-balance.entity';
import { WALLET_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/user.entity';
import { LotteryPurchaseDto } from 'src/lotteries/dto/lottery-purchase.dto';
import { LotteryPurchase } from 'src/lotteries/lottery-purchase.entity';

@Injectable()
export class WalletService {
    constructor(@Inject(WALLET_REPOSITORY) private readonly walletRepository: typeof WalletBalance){}
    async getWalletBalance(userId): Promise <WalletBalance>{
        return await this.walletRepository.findOne({
            where: {userId},
        })
    }

    async update(balance, userId){
        const [numberOfAffectedRows] = await this.walletRepository.update({balance}, { where: {userId}, returning: true})
        return {numberOfAffectedRows};
    }
   
}
