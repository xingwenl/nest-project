import { StorageDto } from './dto';
import { httpRes, ApiErrorCode } from 'src/common/help/http.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Storage } from '../../../common/entities/storage/storage.entity';
@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(Storage)
        private readonly storageRep: Repository<Storage>
    ){}

    async set(dto: StorageDto) {
        const { key, value, creater_id, expires, intro } = dto;
        let res = await this.storageRep.findOne({
            key,
            creater_id
        })
        let expiresTmp: Date = null;
        if (expires) {
            expiresTmp = expires.indexOf('/') === -1 ? new Date(+(new Date()) + Number(expires) * 1000) : new Date(expires)
        }

        try {
            if (res) {
                await this.storageRep.update({
                    key,
                    creater_id
                }, {
                    value,
                    expires: expiresTmp,
                    intro: intro || res.intro,
                })
            } else {
                await this.storageRep.save({
                    key,
                    value,
                    creater_id,
                    expires: expiresTmp,
                    intro,
                })
            }
            return null;
        } catch (error) {
            httpRes(ApiErrorCode.FAIL, error);
        }
    }

    async get(key: string, creater_id: string) {
        let res = await this.storageRep.findOne({
            key: key,
            creater_id: creater_id,
        }, {
            select: [
                'expires', 'id', 'intro', 'key', 'value'
            ]
        })
        if (res && res.expires) {
            const now = +(new Date());
            const expires = +(new Date(res.expires))
            if (now > expires) {
                httpRes(
                    ApiErrorCode.EXPIRES,
                    "已过期"
                )
            }
            if (!res) httpRes(
                ApiErrorCode.NOT_FUND,
                '未找到值'
            )
        }
        
        return res;
    }
}