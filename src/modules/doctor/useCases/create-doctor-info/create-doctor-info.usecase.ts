import { CustomError } from '../../../../errors/custom.error';

import { DoctorInfo } from '../../entities/doctor-info.entity';

import { IDoctorInfoRepository } from '../../repositories/doctor-info.repository';
import { IDoctorRepository } from '../../repositories/doctor.repository';

type DoctorInfoRequest = {
    startAt: string;
    endAt: string;
    price: number;
    duration: number;
}

class CreateDoctorInfoUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
        private doctorInfoRepository: IDoctorInfoRepository
    ){}

    async execute(data: DoctorInfoRequest, userId: string) {
        const doctorByUserId = await this.doctorRepository.findByUserId(userId);

        if (!doctorByUserId) {
            throw new CustomError('Doctor does not exists', 401);
        }

        const doctorInfo = DoctorInfo.create({
            ...data,
            doctorId: doctorByUserId.id
        });

        const doctorInfoCreated = await this.doctorInfoRepository.saveOrUpdate(doctorInfo);

        return doctorInfoCreated;
    }
}

export { DoctorInfoRequest, CreateDoctorInfoUseCase }
