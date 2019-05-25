export enum ApiErrorCode {
    TIMEOUT = -1, //系统繁忙
    SUCCESS = 0, //成功

    USER_NOTFUND, // 用户没找到
    USER_HAVED, // 用户已存在

    PARAMS_INVALID = 400, // 参数错误
    TOKEN_INVALID = 401, //token错误

    DUPLICATE_VALUES = 402, // 值重复

    ARTICLE_TYPE_INVALID = 403, //文章类型错误

    NOT_FUND = 404, //未找到资源
}