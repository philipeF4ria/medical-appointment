import { 
  AppointmentsDate,
  AppointmentsWithPatient,
  IAppointmentRepository
} from '../../appointment.repository';

import { prismaClient } from '../../../../../infra/database/prisma.config';

import { Appointment } from '../../../entities/appointment.entity';
import { endOfDay, startOfDay } from '../../../../../utils/date';

class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]> {
    return await prismaClient.$queryRaw`SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date} 
    and doctor_id = ${doctorId}
    `
  }

  async findAppointmentByDoctorAndDatetime(doctorId: string, date: string): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} 
    and doctor_id = ${doctorId} limit 1
    `

    return result[0];
  }
  async findAppointmentByPatientAndDateTime(patientId: string, date: string): Promise<AppointmentsDate> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date} 
    and patient_id = ${patientId} limit 1
    `

    return result[0];
  }

  async findAllTodayIncludePatients(): Promise<AppointmentsWithPatient[]> {
    const result = await prismaClient.appointment.findMany({
      where: {
        date: {
          gte: startOfDay(),
          lte: endOfDay(),
        },
      },
      include: {
        patient: true,
      },
    });

    return result;
  }

  async save(data: Appointment): Promise<void> {
    await prismaClient.appointment.create({
      data: {
        date: data.date,
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        id: data.id,
      }
    })
  }

}

export { AppointmentPrismaRepository }
