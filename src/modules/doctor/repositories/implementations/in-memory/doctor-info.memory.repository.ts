import { DoctorInfo } from '../../../entities/doctor-info.entity';
import { IDoctorInfoRepository } from '../../doctor-info.repository';

class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
    private items: DoctorInfo[] = []

    async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
        const index = this.items.findIndex(doctor => doctor.doctorId === data.doctorId);

        if (index >= 0) {
            const doctor = this.items[index];

            this.items[index] = {
                ...doctor,
                duration: data.duration,
                price: data.price,
                startAt: data.startAt,
                entAt: data.entAt,
            }

            data = this.items[index];
            
        } else {
            this.items.push(data);
        }

        return data;
    }
}

export { DoctorInfoMemoryRepository }
