import { DoctorScheduleRepository } from '../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository';
import { DoctorPrismaRepository } from '../../../doctor/repositories/implementations/prisma/doctor.prisma.repository';
import { PatientPrismaRepository } from '../../../patient/repositories/implementations/prisma/patient.prisma.repository';
import { AppointmentPrismaRepository } from '../../repositories/implementations/prisma/appointment.prisma.repository';
import { CreateAppointmentController } from './create-appointment.controller';
import { 
  EtherealMailProvider
} from '../../../../infra/providers/mail/implementations/ethereal.mail.provider';

const patientRepository = new PatientPrismaRepository();
const doctorRepository = new DoctorPrismaRepository();
const doctorScheduleRepository = new DoctorScheduleRepository();
const appointmentRepository = new AppointmentPrismaRepository();
const etherealMailProvider = new EtherealMailProvider();

const createAppointmentController = new CreateAppointmentController(
  patientRepository,
  doctorRepository,
  doctorScheduleRepository,
  appointmentRepository,
  etherealMailProvider,
);

export {  createAppointmentController }
