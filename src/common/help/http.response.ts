import { ApiException, ApiErrorCode } from '../exception/api.exception';
import { HttpStatus } from '@nestjs/common';

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

export { ApiException, ApiErrorCode, HttpStatus };

export function httpSuccess(data?: any, message = '成功'): ApiResponse {
  return new ApiResponse(ApiErrorCode.SUCCESS, data, message);
}

export function httpRes(
  code: ApiErrorCode,
  message: string,
  data?: any,
  status = HttpStatus.OK,
): ApiException | ApiResponse {
  if (code != ApiErrorCode.SUCCESS) {
    throw new ApiException(code, message, status, data);
  }
  return new ApiResponse(code, data, message);
}

export function httpForbidden() {
  httpRes(ApiErrorCode.FORBIDDEN, '无权限');
  return false;
}
