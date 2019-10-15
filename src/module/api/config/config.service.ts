import { Injectable } from "@nestjs/common";
import { httpRes, ApiErrorCode } from "src/common/help/http.response";
import { ConfigDto, ConfigEditDto } from "./dto";
import { jsonToObj } from "src/utils";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Config } from "../../../common/entities/config/config.entity";
import { Repository } from "typeorm";

const data = {}

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(Config)
        private readonly configRep: Repository<Config>
    ){}

    async config(type: string, names?: string) {
        // if (!names) {
        //     httpRes(
        //         ApiErrorCode.NOT_FUND,
        //         '请输入配置名称'
        //     )
        // }
        let whereOptions = []
        if (names) {
            const namesArr = names.split(',')
            whereOptions = namesArr.map(name => {
                return {
                    type: type,
                    key: name
                }
            })
        }
        const res = await this.configRep.find({
            select: [ 'key', 'category', 'val', 'id' ],
            where: whereOptions
        })
        if (res) {
            let namesObj = {}
            res.forEach((obj) => {
                namesObj[obj.key] = {
                    ...obj,
                    val: obj.val,
                }
            })
            return namesObj
        }
        httpRes(
            ApiErrorCode.NOT_FUND,
            '没找到'
        )
    }

    async editConfig(params: ConfigEditDto, type: string) {
        try {
            console.log(params)
            await this.configRep.update({
                id: params.id
            }, params)
            return params
        } catch (error) {
            httpRes(
                ApiErrorCode.FAIL,
                '修改失败'
            )
        }
    }

    async setConfig(params: ConfigDto, type: string) {
        try {
            await this.configRep.insert({
                category: type,
                key: params.key,
                val: params.val
            })
            return 'success'
        } catch (error) {
            httpRes(
                ApiErrorCode.FAIL,
                error
            )
        }
    }

    // async setTestConfig(params: ConfigDto) {
    //     data[params.key] = params.val
    //     this.configRep.insert({
    //         type: 'test',
    //         key: params.key,
    //         val: params.val
    //     })
    //     return 'success'
    // }
}