import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Request } from "@nestjs/common";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { AuthService } from "./auth.service";
import { httpRes, ApiErrorCode } from "../../common/help/http.response";
import { SECRET_OR_KEY } from "../../common/constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_OR_KEY,
            passReqToCallback: true
        },
        async (req: Request, payload: JwtPayload, next: Function) => this.validate(req, payload, next)
        )
    }
    async validate(req: Request, payload: JwtPayload, next: Function) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw httpRes(ApiErrorCode.TOKEN_INVALID, 'token无效');
        }
        next(null, user)
    }
    
}