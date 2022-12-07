import { 
    UserPrismaRepository
} from '../../../users/repositories/implementations/user.prisma.repository';

import {
    DoctorPrismaRepository
} from '../../repositories/implementations/prisma/doctor.prisma.repository';

import {
    SpecialtyRepository
} from '../../../specialty/repositories/implementations/specialty.repository';

import { CreateDoctorController } from './create-doctor.controller';

const userRepository = new UserPrismaRepository();
const doctorRepository = new DoctorPrismaRepository();
const specialtyRepository = new SpecialtyRepository();

const createDoctorController = new CreateDoctorController(
    userRepository,
    doctorRepository,
    specialtyRepository
);

export { createDoctorController }
