import { IPatientRepository } from '../../../patient/repositories/patient.repository';
import { IDoctorRepository } from '../../../doctor/repositories/doctor.repository';

import { CustomError } from '../../../../errors/custom.error';

type CreateAppointmentRequest = {
  doctorId: string;
  date: Date;
}

class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId);

    if (!patientExists) {
      throw new CustomError('Patient does not exists');
    }

    const doctorExists = await this.doctorRepository.findById(data.doctorId);

    if (!doctorExists) {
      throw new CustomError('Doctor does not exists');
    }
  }
}

export { CreateAppointmentRequest, CreateAppointmentUseCase }
