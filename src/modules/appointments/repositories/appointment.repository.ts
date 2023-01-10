import { Appointment } from '../entities/appointment.entity';

type AppointmentsDate = {
  date: Date;
}

interface IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(
    doctorId: string, 
    date: string
  ): Promise<AppointmentsDate[]>
  findAppointmentByDoctorAndDatetime(
    doctorId: string, 
    date: string
  ): Promise<AppointmentsDate | null>
  findAppointmentByPatientAndDateTime(
    patientId: string,
    date: string,
  ): Promise<AppointmentsDate>
  save(data: Appointment): Promise<void>
}

export { AppointmentsDate, IAppointmentRepository }
