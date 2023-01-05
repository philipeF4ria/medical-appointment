import { Doctor } from "../entities/doctor.entity";

interface IDoctorRepository {
    save(data: Doctor): Promise<Doctor>;
    findById(id: string): Promise<Doctor | null>;
    findByCRM(crm: string): Promise<Doctor | null>;
    findByUserId(userId: string): Promise<Doctor | null>;
}

export { IDoctorRepository }
