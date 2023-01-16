import { formatDate } from '../../../utils/date';
import { EtherealMailProvider } from '../../providers/mail/implementations/ethereal.mail.provider';

type NotificationTask = {
  email: string;
  date: Date
}

const mailProvider = new EtherealMailProvider();

async function notificationAppointmentWorker(data: NotificationTask): Promise<void> {
  console.log('Enviando e-mail para ' + data.email);

  await mailProvider.sendMail({
    to: data.email,
    from: 'Agendamento de Consulta <noreplay@agenday.com.br>',
    subject: 'Lembrete de consulta',
    html:`
      Olá, <br />
      não se esqueça da sua consulta hoje às ${formatDate(data.date, 'HH:mm')}
    `
  });
}

export { NotificationTask, notificationAppointmentWorker }
