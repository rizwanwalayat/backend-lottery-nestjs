import { Injectable, Inject } from '@nestjs/common';
import { LOTTERY_REPOSITORY, LOTTERY_PURCHASE_REPOSITORY } from 'src/core/constants';
import { Lottery } from './lottery.entity';
import { LotteryPurchase } from './lottery-purchase.entity';
import { LotteryPurchaseDto } from './dto/lottery-purchase.dto';


@Injectable()
export class LotteriesService {
    constructor(@Inject(LOTTERY_PURCHASE_REPOSITORY) private lotteryPurchaseRepository: typeof LotteryPurchase, @Inject(LOTTERY_REPOSITORY) private readonly lotteryRepsitory: typeof Lottery){}
    async findAll(): Promise<Lottery[]>{
        return await this.lotteryRepsitory.findAll<Lottery>();
    }
    async createPurchase(lotteryPurchase: LotteryPurchaseDto, userId, walletOrStripe): Promise<LotteryPurchase>{
        return await this.lotteryPurchaseRepository.create<LotteryPurchase>({...lotteryPurchase, walletOrStripe, userId});
    }
    
}
