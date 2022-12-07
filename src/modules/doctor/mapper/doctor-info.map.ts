import { DoctorInfo as DoctorInfoPrisma} from '@prisma/client';
import { DoctorInfo } from '../entities/doctor-info.entity';

class DoctorInfoMapper {
    static prismaToEntityDoctorInfo(data: DoctorInfoPrisma): DoctorInfo {
        return {
            id: data.id,
            doctorId: data.doctor_id,
            duration: data.duration,
            entAt: data.end_at,
            startAt: data.start_at,
            price: Number(data.price),
        }
    }
}

export { DoctorInfoMapper }
