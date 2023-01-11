type MailDTO = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface IMailProvider {
  sendMail(data: MailDTO): Promise<void>;
}

export { MailDTO, IMailProvider }
