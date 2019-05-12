import { ApiException, ApiErrorCode } from "../exception/api.exception";
import { HttpStatus } from "@nestjs/common";

export class ApiResponse {
    code: number;
    data: any;
    message: string;

    constructor(code: number, data?: any, message?: string) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}

export {
    ApiException,
    ApiErrorCode,
    HttpStatus
}

export function httpRes(code: ApiErrorCode, message: string, data?: any, status = HttpStatus.OK): ApiException | ApiResponse {
    if (code != ApiErrorCode.SUCCESS) {
        return new ApiException(code, message, status)
    }
    return new ApiResponse(code, data, message)
}
