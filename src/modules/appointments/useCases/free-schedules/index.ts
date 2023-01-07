import { 
  DoctorScheduleRepository
} from '../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository';
import { 
  AppointmentPrismaRepository
} from '../../repositories/implementations/prisma/appointment.prisma.repository';

import { FreeSchedulesController } from './free-schedules.controller';

const doctorScheduleRepository = new DoctorScheduleRepository();
const appointmentRepository = new AppointmentPrismaRepository();

const freeSchedulesController = new FreeSchedulesController(doctorScheduleRepository, appointmentRepository);

export { freeSchedulesController }
