import { Controller, UseGuards, Post, Get, Request, Body, Req, Res, HttpStatus, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/users/dto/user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import {currentUser} from 'src/core/decorators/user.decorator'
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        console.log('signup', user)
        return await this.authService.create(user);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin()
    {
        console.log('Google Route')
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req, @Res() res)
    {
        console.log('Goole callback Route***', req.user)
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        console.log('JWT',jwt);
        if (jwt)
            res.redirect(`http://localhost:4200/login/success/${jwt}`);
        else 
            res.redirect('http://localhost:4200/login/failure');
    }

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    async facebookLogin(): Promise<any> {
    //   return HttpStatus.OK;
    }
  
    @Get("/facebook/callback")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginCallback(@Req() req, @Res() res): Promise<any> {

        const jwt: string = req.user.jwt;
        console.log('JWT',jwt);
        if (jwt)
            res.redirect(`http://localhost:4200/login/success/${jwt}`);
        else 
            res.redirect('http://localhost:4200/login/failure');
    }
  

    @UseGuards(AuthGuard('jwt'))
    @Get('role')
    async find(@currentUser() user: User){
        return user.userRoles;
    }


    
}
