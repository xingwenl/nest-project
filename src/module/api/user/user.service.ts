import {
  Injectable,
  HttpStatus,
  Inject,
  forwardRef,
  Request,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto, EditDto } from './dto';
import {
  httpRes,
  ApiResponse,
  ApiException,
  ApiErrorCode,
  httpSuccess,
} from '../../../common/help/http.response';
// import { UserProviders } from "../../common/entities/user.providers";
import { Userinfo } from '../../../common/entities/user/user-info.entity';
import { AuthService } from '../../auth/auth.service';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Userinfo)
    private readonly userRepository: Repository<Userinfo>,
    private readonly authService: AuthService,
  ) {}

  public async info(req: any): Promise<any> {
    let res = req.user;
    return res;
  }

  public async sign(payload: JwtPayload) {
    return this.userRepository.findOne(payload);
  }

  public async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne(loginDto);
    if (user) {
      const token = await this.authService.createToken({
        username: loginDto.username,
      });
      return {
        ...user,
        token,
      };
    }
    httpRes(ApiErrorCode.USER_NOTFUND, '帐号或密码错误');
  }

  public async register(registerDto: RegisterDto) {
    const user = await this.sign({ username: registerDto.username });
    if (user) {
      httpRes(ApiErrorCode.USER_HAVED, '用户已存在');
    }
    const res = await this.userRepository.insert(registerDto);
    return null;
  }

  public async edit(editDto: EditDto, req: any) {
    if (req.user) {
      const user = await this.userRepository.update(
        { id: req.user.id },
        editDto,
      );
      if (user) {
        return null;
      }
    }
    return httpRes(ApiErrorCode.SUCCESS, '失败', req.user);
  }

  async userlist(page = 0, size = 10) {
    let res = await this.userRepository.findAndCount({
      skip: page * size,
      take: size,
      select: ['age', 'create_time', 'username', 'roles', 'id'],
    });
    return {
      count: res[1],
      data: res[0],
    };
  }
}
