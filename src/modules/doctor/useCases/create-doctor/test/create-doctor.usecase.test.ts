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

    test('Should not be able to create a new Doctor with exists CRM', async () => {
        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@test.com',
            password: '123456',
            crm: '123456',
            specialtyId: randomUUID(),
        }

        const doctorMockDuplicated: CreateDoctorRequest = {
            username: 'username_test_duplicated',
            name: 'name_test',
            email: 'email_duplicated@test.com',
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

        await createDoctorUseCase.execute(doctorMock);
        
        expect( async () => {
            await createDoctorUseCase.execute(doctorMockDuplicated);
        }).rejects.toThrow('CRM already exists');
    });

    test('Should not be able to create a new Doctor with invalid CRM', async () => {
        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@test.com',
            password: 'password_test',
            crm: '12345',
            specialtyId: randomUUID(),
        }

        const userRepository = new UserMemoryRepository();
        const doctorRepository = new DoctorMemoryRepository();
        
        const createDoctorUseCase = new CreateDoctorUseCase(
            userRepository,
            doctorRepository
        );
    
        expect(async () => {
            await createDoctorUseCase.execute(doctorMock);
        }).rejects.toThrow('CRM length is incorrect');
    });
});
