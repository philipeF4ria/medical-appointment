import { IAppointmentRepository } from '../../repositories/appointment.repository';
import { IMailProvider } from '../../../../infra/providers/mail/mail.provider';
import { formatDate } from '../../../../utils/date';

class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute() {
    const appointments = await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async appointment => {
      const emailPatient = appointment.patient.email;
      const date = appointment.date;

      await this.mailProvider.sendMail({
        to: emailPatient,
        from: 'Agendamento de Consulta <noreplay@agenday.com.br>',
        subject: 'Lembrete de consulta',
        html:`
          Olá, <br />
          não se esqueça da sua consulta hoje às ${formatDate(date, 'HH:mm')}
        `
      });
    });

    return appointments;
  }
}

export { CreateNotificationAppointmentUseCase }
