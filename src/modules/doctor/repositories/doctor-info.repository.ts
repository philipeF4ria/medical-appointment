import { DoctorInfo } from '../entities/doctor-info.entity';

interface IDoctorInfoRepository {
    saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo>
}

export { IDoctorInfoRepository }
