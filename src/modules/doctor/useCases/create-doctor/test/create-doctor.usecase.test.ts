import { test, describe, expect } from 'vitest';
import { randomUUID } from 'crypto';

import { CreateDoctorRequest, CreateDoctorUseCase } from '../create-doctor.usecase';
import { UserMemoryRepository } from '../../../../users/repositories/implementations/user.memory.repository';
import { DoctorMemoryRepository } from '../../../repositories/implementations/doctor-memory.repository'

describe('Create Doctor Use Case', () => {
    test('Should be able to create a new Doctor', async () => {
        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@test.com',
            password: '123456',
            crm: '123456',
            specialtyId: randomUUID(),
        }

        const userRepository = new UserMemoryRepository();
        const doctorRepository = new DoctorMemoryRepository();
        
        const createDoctorUseCase = new CreateDoctorUseCase(
            userRepository,
            doctorRepository
        );
        const doctorCreate = await createDoctorUseCase.execute(doctorMock);

        expect(doctorCreate).toHaveProperty('id');
    });
});
