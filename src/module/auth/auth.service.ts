import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Userinfo } from '../../common/entities/user/user-info.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Userinfo)
    private readonly userRepository: Repository<Userinfo>,
  ) {}

  /**
   * @description 创建Bearer策略的 token
   * @param {JwtPayload} user
   */
  async createToken(user: JwtPayload): Promise<string> {
    // const use
    const token = this.jwtService.sign(user);
    return `Bearer ${token}`;
  }

  //  token 是从 HTTP 请求中的 Authorization 提取
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userRepository.findOne(payload);
    // return {}
  }
}
