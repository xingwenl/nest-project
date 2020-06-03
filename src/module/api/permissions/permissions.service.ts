import { ApiErrorCode } from './../../../common/enums/api-error-code.enum';
import { httpRes } from '../../../common/help/http.response';
import { PAddDto, PDeleteDto, PEditDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEntity } from './../../../common/entities/permissions/permissions.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRep: Repository<PermissionsEntity>,
  ) {}

  async list(page = 0, size = 10) {
    let res = await this.permissionsRep.findAndCount({
      skip: page * size,
      take: size,
    });

    return {
      count: res[1],
      data: res[0],
    };
  }

  async add(add: PAddDto, req: any) {
    try {
      await this.permissionsRep.insert({
        ...add,
        user_id: req.user.id,
      });
      return null;
    } catch (error) {
      httpRes(ApiErrorCode.FAIL, '系统错误');
    }
  }

  async delete(dto: PDeleteDto) {
    if (dto.id) httpRes(ApiErrorCode.PARAMS_INVALID, 'id 未找到');
    await this.permissionsRep.delete({
      id: dto.id,
    });
    return null;
  }

  async edit(dto: PEditDto) {
    console.log(dto);
    try {
      if (!dto.id) httpRes(ApiErrorCode.PARAMS_INVALID, 'id 未找到');
      let cur = this.permissionsRep.findOne({
        id: dto.id,
      });
      if (!cur) httpRes(ApiErrorCode.NOT_FUND, '找不到当前记录');

      await this.permissionsRep.update(
        {
          id: dto.id,
        },
        dto,
      );
    } catch (error) {
      console.log(error);
      httpRes(ApiErrorCode.FAIL, '系统错误');
    }
    return null;
  }
}
