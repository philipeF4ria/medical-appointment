type AppointmentsDate = {
  date: Date;
}

interface IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]>
}

export { AppointmentsDate, IAppointmentRepository }
