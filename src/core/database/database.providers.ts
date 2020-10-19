import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Todo } from 'src/todos/todo.entity';
import { Role } from 'src/roles/role.entity';
import { userRole } from 'src/roles/user-role.entity';
import { Lottery } from 'src/lotteries/lottery.entity';
import { StripeTransaction } from 'src/stripe/stripe-transaction.entity';
import { WalletBalance } from 'src/wallet/wallet-balance.entity';
import { LotteryPurchase } from 'src/lotteries/lottery-purchase.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([Product, User, Todo, Role, userRole, Lottery, StripeTransaction, WalletBalance, LotteryPurchase]);
        await sequelize.sync();
        return sequelize;
    },
}];