import { Appointment } from '../entities/appointment.entity';

type AppointmentsDate = {
  date: Date;
}

type AppointmentsWithPatient = {
  date: Date;
  patient: {
    email: string,
  };
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
  findAllTodayIncludePatients(): Promise<AppointmentsWithPatient[]>;
  save(data: Appointment): Promise<void>
}

export { 
  AppointmentsDate, 
  AppointmentsWithPatient, 
  IAppointmentRepository,
}
