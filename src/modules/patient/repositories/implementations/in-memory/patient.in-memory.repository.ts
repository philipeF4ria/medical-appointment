import { Patient } from '../../../entities/patient.entity';
import { IPatientRepository } from '../../patient.repository';

class PatientInMemoryRepository implements IPatientRepository {
  readonly items: Patient[] = [];

  async save(data: Patient): Promise<Patient> {
    this.items.push(data);

    return data;
  }

  async findByDocumentOrEmail(document: string, email: string): Promise<Patient | null> {

    return this.items.find(item => item.email === email) || null;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    return this.items.find(item => item.userId === userId) || null;
  }
}

export { PatientInMemoryRepository }
