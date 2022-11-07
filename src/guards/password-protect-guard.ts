import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class PasswordProtectGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const password = this.reflector.get<string>("passwordProtect", context.getHandler());
        // TEST only, 
        return request.headers["x-password"] ===  password;
    }
}