import { Patient } from '../entities/patient.entity';
import { PatientWithUserDTO } from '../dtos/patient.dto';

interface IPatientRepository {
    save(data: Patient): Promise<Patient>;
    findByDocumentOrEmail(document: string, email: string): Promise<Patient | null>;
    findByUserId(userId: string): Promise<PatientWithUserDTO | null>;
}

export { IPatientRepository }
