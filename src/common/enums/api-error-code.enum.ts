export enum ApiErrorCode {
  /**
   * 系统繁忙
   */
  TIMEOUT = -1,

  /**
   * 成功
   */
  SUCCESS = 0,

  /**
   * 用户没找到
   */
  USER_NOTFUND,

  /**
   * 用户已存在
   */
  USER_HAVED,
  /**
   * 系统错误
   */
  FAIL,
  /**
   *  过期
   */
  EXPIRES,

  /**
   * 参数错误
   */
  PARAMS_INVALID = 40000,

  /**
   * token错误
   */
  TOKEN_INVALID = 40001,

  /**
   * 值重复
   */
  DUPLICATE_VALUES = 40002,

  /**
   * 文章类型错误
   */
  ARTICLE_TYPE_INVALID = 40003,

  /**
   * 未找到资源
   */
  NOT_FUND = 404,
  /**
   * 用户禁止
   */
  FORBIDDEN = 403,
}
