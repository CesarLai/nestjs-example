/**
 * 随机字符串生成方法
 * @param length 生成字符串长度
 */
export const getRandomString = (length = 8) => {
  if (length <= 0) {
    return '';
  }

  const charPool = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const randomChars: string[] = [];
  let i = length;
  while (i > 0) {
    const randomIndex = (Math.floor(Math.random() * 100) % charPool.length) - 1;
    randomChars.push(charPool[randomIndex]);
    i--;
  }

  return randomChars.join('');
};
