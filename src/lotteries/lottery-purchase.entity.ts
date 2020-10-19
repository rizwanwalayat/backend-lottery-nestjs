import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt} from "sequelize-typescript";
import { User } from "src/users/user.entity";
import { Lottery } from "./lottery.entity";

@Table
export class LotteryPurchase extends Model<LotteryPurchase> {
    
    @ForeignKey(()=>Lottery)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    lotteryId: number;

    @BelongsTo(()=>Lottery)
    lottery: Lottery;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    entries: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalAmount: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    walletOrStripe: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(()=>User)
    user: User;


    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
  
}