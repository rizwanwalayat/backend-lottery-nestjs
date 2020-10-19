import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import {Observable} from 'rxjs';
import { UsersService } from "src/users/users.service";

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UsersService) {}

    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request){
        const userExist = await this.userService.findOneByEmail(request.body.email);
        if (userExist){
            throw new ForbiddenException("This email is already registered");
        }

        return true;
    }
}
