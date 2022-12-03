import { Doctor } from "../entities/doctor.entity";

interface IDoctorRepository {
    save(data: Doctor): Promise<Doctor>;
    findByCRM(crm: string): Promise<Doctor | undefined>;
}

export { IDoctorRepository }
