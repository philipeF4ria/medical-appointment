import { User } from "../../../users/entities/user.entity";
import { Doctor } from "../../entities/doctor.entity";

import { IUserRepository } from "../../../users/repositories/user.repository";
import { IDoctorRepository } from '../../repositories/doctor.repository';

import { CustomError } from "../../../../errors/custom.error";

type CreateDoctorRequest = {
    username: string;
    name: string;
    email: string;
    password: string;
    crm: string;
    specialtyId: string;
}

class CreateDoctorUseCase {
    constructor(
        private userRepository: IUserRepository, 
        private doctorRepository: IDoctorRepository
    ){}

    async execute(data: CreateDoctorRequest) {
        const user = User.create({
            name: data.name,
            username: data.username,
            password: data.username,
        });

        const existUser = await this.userRepository.findByUsername(data.username);

        if (existUser) {
            throw new CustomError('Username already exists');
        }

        const userCreated = await this.userRepository.save(user);

        const doctor = Doctor.create({
            crm: data.crm,
            email: data.email,
            specialityId: data.specialtyId,
            userId: userCreated.id,
        });

        const crmExists = await this.doctorRepository.findByCRM(data.crm);

        if (crmExists) {
            throw new CustomError('CRM already exists', 400);
        }

        const doctorCreated = await this.doctorRepository.save(doctor);

        return doctorCreated;
    }
}

export { CreateDoctorRequest, CreateDoctorUseCase }
