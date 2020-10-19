import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        });
        // console.log('ExtractJwt', ExtractJwt.fromAuthHeaderAsBearerToken())
    }

    async validate(payload: any){
        // console.log('Step 1: Validate User JWT Strategy', payload);

        const user = await this.userService.getUserById(payload.id);
        if (!user){
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return user;
    }
}