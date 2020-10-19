import {Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany, HasOne} from 'sequelize-typescript';
import { Role } from '../roles/role.entity';
import { userRole } from 'src/roles/user-role.entity';
import { WalletBalance } from 'src/wallet/wallet-balance.entity';
import { StripeTransaction } from 'src/stripe/stripe-transaction.entity';

@Table
export class User extends Model<User>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;
    
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    password: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    image: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    thirdPartyId: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    provider: string;

    @HasMany(() => userRole)
    userRoles: userRole[];

    @HasMany(() => StripeTransaction)
    stripeTransaction: StripeTransaction[];

    @HasOne(() => WalletBalance)
    walletBalance: WalletBalance;

    @Column({
        type: DataType.ENUM,
        values: ['Male', 'Female'],
        allowNull: true
    })
    gender: string;
    
}