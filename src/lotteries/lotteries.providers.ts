import { Injectable } from '@nestjs/common';
import { LOTTERY_REPOSITORY, LOTTERY_PURCHASE_REPOSITORY } from '../core/constants'
import { Lottery } from './lottery.entity';
import { LotteryPurchase } from './lottery-purchase.entity';

export const lotteryProvider = [{
    provide: LOTTERY_REPOSITORY,
    useValue: Lottery
}]

export const lotteryPurchaseProvider = [{
    provide: LOTTERY_PURCHASE_REPOSITORY,
    useValue: LotteryPurchase
}]

