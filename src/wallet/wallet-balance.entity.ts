import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt} from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table
export class WalletBalance extends Model<WalletBalance> {
    

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    balance: number;

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