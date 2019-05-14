import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { SECRET_OR_KEY } from "../../common/constants/constants";

@Global()
@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secretOrPrivateKey: SECRET_OR_KEY,
			signOptions: {
				expiresIn: '2 days',
			},
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [PassportModule, AuthService],
})
export class AuthModule {}