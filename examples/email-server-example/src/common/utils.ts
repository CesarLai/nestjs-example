/**
 * 生成随机纯数字短信验证码
 *
 * @param {number} length 验证码长度，值至少等于1
 */
export const getCheckcode = (length = 6): string => {
  if (length <= 0) {
    throw new Error('验证码长度不得小于1');
  }

  let checkcode = '';
  for (let i = 0; i < length; i++) {
    checkcode += Math.floor(Math.random() * 10);
  }

  return checkcode;
};
