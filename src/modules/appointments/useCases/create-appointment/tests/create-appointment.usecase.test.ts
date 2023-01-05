import { describe, test, expect } from 'vitest';

import { PatientInMemoryRepository } from '../../../../patient/repositories/implementations/in-memory/patient.in-memory.repository';
import { CreateAppointmentUseCase } from '../create-appointment.usecase';

import { generateUUID } from '../../../../../utils/generateUUID';
import { DoctorMemoryRepository } from '../../../../doctor/repositories/implementations/in-memory/doctor.memory.repository';

describe('Create Appointment', () => {
  test('Should not me able to create an appointment withou a patient or with an invalid patient', () => {
    const patientInMemoryRepository = new PatientInMemoryRepository();
    const doctorInMemoryRepository = new DoctorMemoryRepository();

    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository,
    );

    expect(async () => {
      await createAppointmentUseCase.execute({
        doctorId: generateUUID(),
        date: new Date(),
      }, 'ID_USER_INVALID');
    }).rejects.toThrow('Patient does not exists');
  });

  test('Should not me able to create an appointment withou a doctor or with an invalid doctor', async () => {
    const patientInMemoryRepository = new PatientInMemoryRepository();
    const doctorInMemoryRepository = new DoctorMemoryRepository();

    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository,
    );

    const patient = await patientInMemoryRepository.save({
      id: generateUUID(),
      document: 'PATIENT_DOCUMENT',
      email: 'patient@mail.com',
      userId: generateUUID(),
    })

    expect(async () => {
      await createAppointmentUseCase.execute({
        doctorId: generateUUID(),
        date: new Date(),
      }, patient.userId);
    }).rejects.toThrow('Doctor does not exists');
  });
});
