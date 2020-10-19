import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { userRoleProviders } from 'src/roles/user-role.providers';
import { WalletModule } from 'src/wallet/wallet.module';
import { walletProvider } from 'src/wallet/wallet.providers';

@Module({
  providers: [UsersService, ...usersProviders, ...userRoleProviders, ...walletProvider],
  exports: [UsersService]
})
export class UsersModule {}
