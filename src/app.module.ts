import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { LotteriesModule } from './lotteries/lotteries.module';
import { StripeModule } from './stripe/stripe.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    ProductsModule, DatabaseModule, AuthModule, TodosModule, LotteriesModule, StripeModule, WalletModule],
  controllers: [AppController, TodosController],
  providers: [AppService],
})
export class AppModule {}
