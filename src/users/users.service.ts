import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY, USER_ROLE_REPOSITORY, WALLET_REPOSITORY } from 'src/core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { userRole } from 'src/roles/user-role.entity';
import { WalletBalance } from 'src/wallet/wallet-balance.entity';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User, @Inject(USER_ROLE_REPOSITORY) private readonly userRoleRepository: typeof userRole, @Inject(WALLET_REPOSITORY) private readonly walletRepository: typeof WalletBalance,) { }

    async create(user: UserDto): Promise<User> {
        const createdUser = await this.userRepository.create<User>(user);
        await this.newUserSetup(createdUser.id, user.role);
        return createdUser;
    }
    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({where: {email}});
    }
    async findOneById(id: number): Promise<User> {
        console.log('findOneById')
        return await this.userRepository.findOne<User>({where: {id}});
    }
    async getRoleByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({where: {email},
        include:[{
            model: Role
        },
    ] })
    }

    async getUserById(id: number){
        let user = await this.findOneById(id);
        console.log('getUser', user.dataValues)
        let roles =  await this.getRoleById(id);
       return {...user.dataValues, roles}
    }

    async getRoleById(userId: number): Promise<any> {
        let role =  await this.userRoleRepository.findOne<any>({where: {userId},
        include:[{
            model: Role,
            attributes: ['role'],
        },
    ] })
    return role.role.role;
    }

    async findOneByThirdPartyId(thirdPartyId: number){
        return await this.userRepository.findOne<User>({where: {thirdPartyId},
            include:[{
                model: userRole,
                attributes: ['roleId'],
                include: [{
                    model: Role,
                    attributes: ['role']
                }]
            }]  
        });
    }
    async newUserSetup(userId, userRole?){
        let roleId = userRole ? userRole : process.env.DEFAULT_ROLE_ID
        await this.createUserRole(userId, roleId);
        await this.createUserWallet(userId);
    }
    async createUserWallet(userId){
        return await this.walletRepository.create({userId, balance: 0.00})
    }
    async createUserRole(userId, roleId){
        return await this.userRoleRepository.create({userId, roleId});

    }
    async registerOAuthUser(user: any): Promise<User> {
        const createdUser = await this.userRepository.create<User>(user);
        this.newUserSetup(createdUser.id); 
        return createdUser;
    }
}
