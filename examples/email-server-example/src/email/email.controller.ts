import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseBody } from '@/common/models/response.model';
import { SendCheckcodeEmailDto } from './dto/send-checkcode-email.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  async sendEmail(
    @Body()
    body: SendEmailDto,
    @Res()
    res: Response,
  ): Promise<Response> {
    await this.emailService.sendEmail(body);
    return res.json(new ResponseBody(0, null, 'success'));
  }

  @Post('/checkcode/send')
  async sendCheckcode(
    @Body()
    body: SendCheckcodeEmailDto,
    @Res()
    res: Response,
  ): Promise<Response> {
    await this.emailService.sendCheckcodeEmail(body);
    return res.json(new ResponseBody(0, null, 'success'));
  }
}
