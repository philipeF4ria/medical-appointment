import { 
    DoctorPrismaRepository 
} from '../../repositories/implementations/prisma/doctor.prisma.repository'
import { 
    DoctorScheduleRepository 
} from '../../repositories/implementations/prisma/doctor-schedule.prisma.repository';

const doctorRepository = new DoctorPrismaRepository();
const doctorScheduleRepository = new DoctorScheduleRepository();

import { CreateDoctorScheduleController } from './create-doctor-schedule.controller';

const createDoctorScheduleController = new CreateDoctorScheduleController(
    doctorRepository,
    doctorScheduleRepository,
);

export { createDoctorScheduleController }
