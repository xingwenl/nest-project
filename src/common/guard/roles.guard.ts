import { httpForbidden } from '../help/http.response';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const req = context.switchToHttp().getRequest();
    // console.log(request.headers.cookies)
    const user = req.user;
    const hasRole = () => user.roles.some(role => roles.includes(role));
    return user && user.roles && hasRole() ? true : httpForbidden();
  }
}
