import { IAppointmentRepository } from '../../repositories/appointment.repository';
import { IMailProvider } from '../../../../infra/providers/mail/mail.provider';
import { formatDate } from '../../../../utils/date';
import { queueAppointmentNotification } from '../../../../infra/queue/notification-appointment/notification-appointment.queue';

class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute() {
    const appointments = await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async appointment => {
      const emailPatient = appointment.patient.email;
      const date = appointment.date;

      await queueAppointmentNotification.push({
        email: emailPatient,
        date,
      });
    });

    return appointments;
  }
}

export { CreateNotificationAppointmentUseCase }
