import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { SendEmailDto } from './dto/send-email.dto';
import { SendCheckcodeEmailDto } from './dto/send-checkcode-email.dto';
import { getCheckcode } from '@/common/utils';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) {}

  sendEmail(dto: SendEmailDto): Promise<void> {
    return this.emailProvider.sendEmail({
      subject: dto.subject,
      to: dto.to,
      text: dto.content,
      cc: dto.cc,
    });
  }

  sendCheckcodeEmail(dto: SendCheckcodeEmailDto): Promise<void> {
    const checkcode = getCheckcode(6);
    return this.emailProvider.sendCheckcodeEmail(
      dto.to,
      dto.subject,
      checkcode,
    );
  }
}
