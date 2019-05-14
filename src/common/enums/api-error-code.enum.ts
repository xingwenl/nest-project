export enum ApiErrorCode {
    TIMEOUT = -1, //系统繁忙
    SUCCESS = 0, //成功

    USER_NOTFUND,

    PARAMS_INVALID = 400, // 参数错误
    TOKEN_INVALID = 401, //token错误
}