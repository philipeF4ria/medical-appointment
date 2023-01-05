import { Doctor } from '../../../entities/doctor.entity';
import { IDoctorRepository } from '../../doctor.repository';

class DoctorMemoryRepository implements IDoctorRepository {
    private items: Doctor[] = []
    
    async save(data: Doctor): Promise<Doctor> {
        this.items.push(data);

        return data;
    }

    async findById(id: string): Promise<Doctor | null> {
        return this.items.find(item => item.id === id) || null;
    }

    async findByCRM(crm: string): Promise<Doctor | null> {
        return this.items.find(doctor => doctor.crm === crm) || null;
    }

    async findByUserId(userId: string): Promise<Doctor | null> {
        return this.items.find(doctor => doctor.userId === userId) || null;
    }

}

export { DoctorMemoryRepository }
