import { WALLET_REPOSITORY } from '../core/constants'
import { WalletBalance } from "./wallet-balance.entity";
export const walletProvider = [{
    provide: WALLET_REPOSITORY,
    useValue: WalletBalance
}]