export const checkCodeTemplate = (checkcode: string) => {
  return `
    <div style="width: calc(100% - 46px); max-width: 600px; min-width: 320px; margin: 0px auto; border: 1px solid #d0d0d0; border-radius: 4px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="box-sizing: border-box; width: 100%; padding: 20px 30px; border-bottom: 1px solid #d0d0d0;">
        <div style="font-size: 48px; font-weight: 600; line-height: 56px; font-family: sans-serif;">
          <span style="color: #2643a5;">Cesar</span> <span style="color: #38ace3;">Lai</span>
        </div>
      </div>
      <div style="box-sizing: border-box; width: 100%; min-height: 200px; padding: 20px 30px; ">
        <span style="font-size: 15px; color: #333333; line-height: 25px;">
          欢迎使用邮件服务，<br />
          本次验证码为 <strong style="color: #38ace3;">${checkcode}</strong>
        </span>
      </div>
    </div>
  `;
}
