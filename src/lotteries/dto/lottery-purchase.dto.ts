import { IsNotEmpty, MinLength } from "class-validator";

export class LotteryPurchaseDto {
    @IsNotEmpty()
    readonly lotteryId: number;

    @IsNotEmpty()
    readonly entries: number;

    @IsNotEmpty()
    readonly totalAmount: number;


}