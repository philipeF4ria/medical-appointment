import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, MailDTO } from '../mail.provider';

class EtherealMailProvider implements IMailProvider {
  private client!: Transporter;

  constructor() {
    nodemailer.createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'elody.runolfsdottir95@ethereal.email',
            pass: '4wCurw4SJr3hkDHW74'
          }
        });

        this.client = transporter;
      }).catch(console.log);
  }

  async sendMail(data: MailDTO): Promise<void> {
    const resultMail = await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log('Message sent: %s', resultMail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(resultMail));
  }

}

export { EtherealMailProvider }
