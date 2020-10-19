import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt} from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table
export class StripeTransaction extends Model<StripeTransaction> {
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    transactionId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    walletOrPurchase: string;

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