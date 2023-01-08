import { prismaClient } from '../../../../../infra/database/prisma.config';
import { AppointmentsDate, IAppointmentRepository } from '../../appointment.repository';

class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]> {
    return await prismaClient.$queryRaw`SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date} 
    and doctor_id = ${doctorId}
    `
  }
}

export { AppointmentPrismaRepository }
