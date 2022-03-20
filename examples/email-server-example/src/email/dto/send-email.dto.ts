export interface SendEmailDto {
  subject: string;
  to: string;
  content: string;
  cc?: string;
}
