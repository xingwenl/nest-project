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

    async set(dto: StorageDto, creater_id: string) {
        const { key, value, expires, intro } = dto;
        let res = await this.storageRep.findOne({
            key,
            creater_id
        })

        let expiresTmp: Date = null;
        if (expires) {
            expiresTmp = /\-|\//.test(expires.toString()) ? new Date(expires) : new Date(+(new Date()) + Number(expires) * 1000)
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

    async get(creater_id: string, key?: string, page=0, size=10) {
        if (!key) {
            let res = await this.storageRep.findAndCount({
                skip: page * size,
                take: size,
                where: {
                    creater_id
                }
            })
            return {
                count: res[1],
                data: res[0]
            }
        }
        let res = await this.storageRep.findOne({
            key,
            creater_id
        }, {
            select: [ 'expires', 'id', 'intro', 'key', 'value' ]
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
        }
        if (!res) httpRes(
            ApiErrorCode.NOT_FUND,
            '未找到值'
        )
        
        return res;
    }

    remove(key: string, creater_id: string) {

    }
}