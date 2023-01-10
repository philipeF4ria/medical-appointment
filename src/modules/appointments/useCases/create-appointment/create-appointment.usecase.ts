import { IPatientRepository } from '../../../patient/repositories/patient.repository';
import { IDoctorRepository } from '../../../doctor/repositories/doctor.repository';
import { 
  IDoctorScheduleRepository
} from '../../../doctor/repositories/doctor-schedule.repository';
import { IAppointmentRepository } from '../../repositories/appointment.repository';

import { CustomError } from '../../../../errors/custom.error';
import { dateToString, formatDate, getDayOfWeek, toDate } from '../../../../utils/date';
import { Appointment } from '../../entities/appointment.entity';

type CreateAppointmentRequest = {
  doctorId: string;
  date: Date;
}

class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId);

    if (!patientExists) {
      throw new CustomError('Patient does not exists');
    }

    const doctorExists = await this.doctorRepository.findById(data.doctorId);

    if (!doctorExists) {
      throw new CustomError('Doctor does not exists');
    }

    const dayOfWeek = getDayOfWeek(dateToString(data.date));

    const doctorSchedule = await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
      data.doctorId, 
      dayOfWeek
    );
    
    if (!doctorSchedule) {
      throw new CustomError('Doctor does not attend that day', 400);
    }

    const dateFormat = formatDate(data.date, 'YYYY-MM-DD HH:mm');

    const existsAppointmentDoctor = await this.appointmentRepository.findAppointmentByDoctorAndDatetime(
      doctorExists.id,
      dateFormat
    );

    if (existsAppointmentDoctor) {
      throw new CustomError('There is already an appointment for this time');
    }

    const existsAppointmentPatient = await this.appointmentRepository.findAppointmentByPatientAndDateTime(
      doctorExists.id,
      dateFormat
    );

    if (existsAppointmentPatient) {
      throw new CustomError('There is already an appointment for this patient');
    }

    const appointment = Appointment.create({
      date: toDate(data.date),
      doctorId: data.doctorId,
      patientId: patientExists.id,
    });

    await this.appointmentRepository.save(appointment);
  }
}

export { CreateAppointmentRequest, CreateAppointmentUseCase }
