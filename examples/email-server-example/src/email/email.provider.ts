import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { Options as MailerOptions } from 'nodemailer/lib/mailer';
import { createTransport, Transporter } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import { checkCodeTemplate } from './email.template';

function getEnv() {
  return {
    SMTP_HOST: process.env.EMAIL_SMTP_HOST || '',
    SMTP_PORT: process.env.EMAIL_SMTP_PORT || '',
    SMTP_USER: process.env.EMAIL_SMTP_USER || '',
    SMTP_PASS: process.env.EMAIL_SMTP_PASS || '',
    OP_FROM: process.env.EMAIL_OP_FROM || '',
    OP_TO: process.env.EMAIL_OP_TO || '',
  };
}

@Injectable()
export class EmailProvider {
  transporter: Transporter<SentMessageInfo>;
  baseMailOptions: MailerOptions;

  constructor() {
    this.init();
  }

  /**
   * 初始化邮件服务
   */
  init() {
    const envMap = getEnv();

    this.transporter = createTransport(
      smtpTransport({
        host: envMap.SMTP_HOST,
        port: Number.parseInt(envMap.SMTP_PORT, 10),
        secure: true,
        auth: {
          user: envMap.SMTP_USER,
          pass: envMap.SMTP_PASS,
        },
      }),
    );

    this.baseMailOptions = {
      from: envMap.OP_FROM,
      to: envMap.OP_TO,
    };
  }

  generateHtml(checkcode: string): string {
    return checkCodeTemplate(checkcode);
  }

  /**
   * 发送邮件
   *
   * @param options 邮件配置项
   */
  sendEmail(options: MailerOptions): Promise<void> {
    const mailOptions = {
      ...this.baseMailOptions,
      ...options,
    };

    return new Promise<void>((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          // 发送邮件失败
          console.error(error);
          reject(error.message);
        } else {
          // 发送邮件成功
          console.log(response);
          resolve();
        }
        this.transporter.close();
      });
    });
  }

  /**
   * 发送验证码邮件
   *
   * @param email 接受邮箱
   * @param checkcode 验证码
   */
  sendCheckcodeEmail(
    email: string,
    subject: string,
    checkcode: string,
  ): Promise<void> {
    return this.sendEmail({
      to: email,
      subject,
      html: this.generateHtml(checkcode),
    });
  }
}
