import { CustomError } from "../../../../errors/custom.error";

import { DoctorInfo } from "../../entities/doctor-info.entity";

import { IDoctorRepository } from "../../repositories/doctor.repository";

type DoctorInfoRequest = {
    startAt: string;
    endAt: string;
    price: number;
    duration: number;
}

class CreateDoctorInfoUseCase {
    constructor(private doctorRepository: IDoctorRepository){}

    async execute(data: DoctorInfoRequest, userId: string) {
        const doctorByUserId = await this.doctorRepository.findByUserId(userId);

        if (!doctorByUserId) {
            throw new CustomError('Doctor does not exists');
        }

        const doctorInfo = DoctorInfo.create({
            ...data,
            doctorId: doctorByUserId.id
        });

        return doctorInfo;
    }
}

export { DoctorInfoRequest, CreateDoctorInfoUseCase }
