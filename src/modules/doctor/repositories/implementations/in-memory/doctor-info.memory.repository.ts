import { DoctorInfo } from '../../../entities/doctor-info.entity';
import { IDoctorInfoRepository } from '../../doctor-info.repository';

class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
    private items: DoctorInfo[] = []

    async save(data: DoctorInfo): Promise<DoctorInfo> {
        this.items.push(data);

        return data;
    }
}

export { DoctorInfoMemoryRepository }
