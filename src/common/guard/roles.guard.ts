import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from 'rxjs'
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true;
        const request = context.switchToHttp().getRequest();
        // console.log(request.headers.cookies)
        if (roles.length > 0) {
            if (roles.some(item => item === 'user')) {
                return request.query.token
            }
        }
        return true;
    }
}