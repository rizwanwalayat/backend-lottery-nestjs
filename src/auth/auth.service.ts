import { Injectable , InternalServerErrorException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

export enum Provider{
    GOOGLE = 'google',
    FACEBOOK = 'facebook'
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {}

    async validateUser(username: string, pass: string){
        const user = await this.usersService.findOneByEmail(username)
        if (!user){
            return null;
        }

        const match = await this.comparePassword(pass, user.password);
        if (!match){
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const {password, ...result} = user['dataValues'];
        return result;
    }

    public async create(user){
        const pass = await this.hashPassword(user.password);
        const newUser = await this.usersService.create({...user, password: pass});

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        const token = await this.generateToken(result);

        return {user: result, token}
    }

    public async login(userReq){
        let user = await this.usersService.getUserById(userReq.id);
        console.log('user', user)
        const token = await this.generateToken(user);
        return {user, token};
    }
  
    private async comparePassword(enteredPassword, dbPassword){
     const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    private async generateToken(user){
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password){
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    async validateOAuthLogin(thirdPartyUser: any): Promise<string>{
        try 
        {
            let user = await this.usersService.findOneByThirdPartyId(thirdPartyUser.thirdPartyId);
            console.log('user', user)

            if (!user){                
                console.log('Third Party', thirdPartyUser);
                user = await this.usersService.registerOAuthUser(thirdPartyUser);       
            }
            let finalUser = await this.usersService.getUserById(user.id);
            console.log('finalUser', finalUser)
            const jwt: string = await this.generateToken(finalUser);
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
