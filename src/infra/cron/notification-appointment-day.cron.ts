import cron from 'node-cron';
import { AppointmentPrismaRepository } from '../../modules/appointments/repositories/implementations/prisma/appointment.prisma.repository';
import { CreateNotificationAppointmentUseCase } from '../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase';
import { EtherealMailProvider } from '../providers/mail/implementations/ethereal.mail.provider';

cron.schedule('*/15 * * * * *', async () => {
  const appointmentRepository = new AppointmentPrismaRepository();
  const mailProvider = new EtherealMailProvider();

  const createNotificationAppointment = new CreateNotificationAppointmentUseCase(
    appointmentRepository,
    mailProvider,
  );

  await createNotificationAppointment.execute();
});
