import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService, Provider } from "../../auth/auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly authService: AuthService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback: true,
            scope: ['profile', 'email']
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, scope, done: Function)
    {
        try
        {   
            console.log('Scope:',  scope);
            let thirdPartyUser = {
                thirdPartyId: scope.id, 
                name: scope.displayName, 
                email: scope.emails[0].value ,
                provider: Provider.GOOGLE
                }
            const jwt: string = await this.authService.validateOAuthLogin(thirdPartyUser)
            const user = { jwt }
            // console.log('User OBJ', user)
            done(null, user);
        }
        catch(err)
        {
            // console.log(err)
            done(err, false);
        }
    }
}