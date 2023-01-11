import { Doctor } from "../entities/doctor.entity";
import { DoctorWithUserDTO } from '../dtos/doctor.dto';

interface IDoctorRepository {
    save(data: Doctor): Promise<Doctor>;
    findById(id: string): Promise<DoctorWithUserDTO | null>;
    findByCRM(crm: string): Promise<Doctor | null>;
    findByUserId(userId: string): Promise<Doctor | null>;
}

export { IDoctorRepository }
