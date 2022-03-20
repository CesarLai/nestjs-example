import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailProvider } from './email.provider';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailService, EmailProvider],
})
export class EmailModule {}
