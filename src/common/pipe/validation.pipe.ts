import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, classToClass, serialize } from 'class-transformer';
import { httpRes, ApiErrorCode } from '../help/http.response';

/**
 * @description 判断参数是否符合规范
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        
        const errors = await validate(object, {
            whitelist: true // 自动剥离我不想要的属性 很舒服啊
        });
        if (errors.length > 0) {
            const error = errors[0]
            //  只返回错误消息，其他暂时不返回
            if (error.constraints && error.constraints instanceof Object) {
                throw httpRes(ApiErrorCode.PARAMS_INVALID, '参数错误', {
                    property: error.property,
                    message: Object.values(error.constraints)[0]
                })
            }
            throw httpRes(ApiErrorCode.PARAMS_INVALID, '参数错误', error)
        }
        return object;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
