export class ResponseBody<T> {
  code: number;
  data: T;
  message: string;

  /**
   * 响应数据模型
   *
   * @param {number} code 请求状态码
   * @param {object} data 请求返回的数据
   * @param {string} message 请求状态描述
   */
  constructor(code, data: T, message) {
    /** 请求状态码 */
    this.code = code;
    /** 请求返回的数据 */
    this.data = data;
    /** 请求状态描述 */
    this.message = message;
  }
}
