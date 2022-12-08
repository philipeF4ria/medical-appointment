import { describe, test, expect } from 'vitest';
import dayjs from 'dayjs';

import { DoctorInfoRequest, CreateDoctorInfoUseCase } from '../create-doctor-info.usecase';

import { DoctorMemoryRepository } from '../../../repositories/implementations/in-memory/doctor.memory.repository';
import { DoctorInfoMemoryRepository } from '../../../repositories/implementations/in-memory/doctor-info.memory.repository';

import { generateUUID } from '../../../../../utils/generateUUID';

describe('Create Doctor Info', () => {
    test('Should not be able to create a doctor info if doctor not exists', () => {
        const doctorRepository = new DoctorMemoryRepository();
        const doctorInfoRepository = new DoctorInfoMemoryRepository();

        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository);

        const doctorInfo: DoctorInfoRequest = {
            startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
            endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
            price: 150,
            duration: 10,
        }

        expect(async () => {
            await createDoctorInfoUseCase.execute(doctorInfo, 'INVALID_USER_ID');
        }).rejects.toThrow('Doctor does not exists');
    });

    test('Should not be able to create a doctor info if endAt is before startAt', async () => {
        const doctorRepository = new DoctorMemoryRepository();
        const doctorInfoRepository = new DoctorInfoMemoryRepository();

        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)

        const userId = generateUUID();

        await doctorRepository.save({
            crm: '123456',
            email: 'doctor@please.com',
            id: generateUUID(),
            specialityId: generateUUID(),
            userId,
        });

        const doctorInfo: DoctorInfoRequest = {
            startAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
            endAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
            price: 200,
            duration: 30,
        }

        expect(async () => {
            await createDoctorInfoUseCase.execute(doctorInfo, userId);
        }).rejects.toThrow('End time cannot be earlier than start time');
    });

    test('Should not be able to create a doctor info if endAt is invalid', async () => {
        const doctorRepository = new DoctorMemoryRepository();
        const doctorInfoRepository = new DoctorInfoMemoryRepository();


        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)

        const userId = generateUUID();

        await doctorRepository.save({
            crm: '123456',
            email: 'doctor@please.com',
            id: generateUUID(),
            specialityId: generateUUID(),
            userId,
        });

        const doctorInfo: DoctorInfoRequest = {
            startAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
            endAt: '99:99',
            price: 200,
            duration: 30,
        }

        expect(async () => {
            await createDoctorInfoUseCase.execute(doctorInfo, userId);
        }).rejects.toThrow('Invalid endAt');
    });

    test('Should not be able to create a doctor info if startAt is invalid', async () => {
        const doctorRepository = new DoctorMemoryRepository();
        const doctorInfoRepository = new DoctorInfoMemoryRepository();

        
        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)

        const userId = generateUUID();

        await doctorRepository.save({
            crm: '123456',
            email: 'doctor@please.com',
            id: generateUUID(),
            specialityId: generateUUID(),
            userId,
        });

        const doctorInfo: DoctorInfoRequest = {
            startAt: '99:99',
            endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
            price: 200,
            duration: 30,
        }

        expect(async () => {
            await createDoctorInfoUseCase.execute(doctorInfo, userId);
        }).rejects.toThrow('Invalid startAt');
    });

    test('Should be able to create a new doctor info', async () => {
        const doctorRepository = new DoctorMemoryRepository();
        const doctorInfoRepository = new DoctorInfoMemoryRepository();

        const userId = generateUUID();

        await doctorRepository.save({
            crm: '123456',
            email: 'doctor@please.com',
            id: generateUUID(),
            specialityId: generateUUID(),
            userId,
        });

        const doctorInfoMock: DoctorInfoRequest = {
            duration: 20,
            startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
            endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'),
            price: 250,
        }

        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
            doctorRepository,
            doctorInfoRepository,
        );

        const doctorInfoCreate = await createDoctorInfoUseCase.execute(doctorInfoMock, userId);

        expect(doctorInfoCreate).toHaveProperty('id');
    });
});
