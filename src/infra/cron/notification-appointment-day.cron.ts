import cron from 'node-cron';
import { AppointmentPrismaRepository } from '../../modules/appointments/repositories/implementations/prisma/appointment.prisma.repository';
import { CreateNotificationAppointmentUseCase } from '../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase';

cron.schedule('0 0 0 * * *', async () => {
  const appointmentRepository = new AppointmentPrismaRepository();

  const createNotificationAppointment = new CreateNotificationAppointmentUseCase(
    appointmentRepository,
  );

  await createNotificationAppointment.execute();
});
