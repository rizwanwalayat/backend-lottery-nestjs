import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { Injectable } from "@nestjs/common";
import { AuthService, Provider } from "../../auth/auth.service";


@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

    constructor(private readonly authService: AuthService){
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            scope: ['email'],
            profileFields: ['emails', 'name']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) : Promise<any>
    {
        try
        {   
            const {name, emails, id} = profile;
            console.log('facebook user', profile)

            const thirdPartyUser = {
                thirdPartyId: id,
                name: name.givenName+' '+name.familyName,
                email: emails[0].value,
                provider: Provider.FACEBOOK
            }

            // console.log('Scope:',  scope);
            const jwt: string = await this.authService.validateOAuthLogin(thirdPartyUser)
            const user = { jwt }
            // // console.log('User OBJ', user)
            done(null, user);
        }
        catch(err)
        {
            // console.log(err)
            done(err, false);
        }
    }
}