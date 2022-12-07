import { DoctorInfo } from '../entities/doctor-info.entity';

interface IDoctorInfoRepository {
    save(data: DoctorInfo): Promise<DoctorInfo>
}

export { IDoctorInfoRepository }
