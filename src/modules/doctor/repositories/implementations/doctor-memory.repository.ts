import { Doctor } from '../../entities/doctor.entity';
import { IDoctorRepository } from '../doctor.repository';

class DoctorMemoryRepository implements IDoctorRepository {
    private items: Doctor[] = []
    
    async save(data: Doctor): Promise<Doctor> {
        this.items.push(data);

        return data;
    }

    async findByCRM(crm: string): Promise<Doctor | undefined> {
        return this.items.find(doctor => doctor.crm === crm) || undefined;
    }

}

export { DoctorMemoryRepository }
