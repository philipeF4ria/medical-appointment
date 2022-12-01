import { test, expect, describe } from 'vitest';

import { Doctor } from '../doctor.entity';

describe('Doctor entity', () => {
    test('Should be able to register a doctor', () => {
        const doctor = Doctor.create({
            crm: '123456',
            email: 'johndoe@email.com',
            specialityId: 'SPECIALITY_ID',
            userId: 'USER_ID',
        });
    
        expect(doctor).toBeInstanceOf(Doctor);
        expect(doctor).toHaveProperty('id');
    });
    
    test('Should not be able to register a doctor with invalid CRM', () => {
    
        expect(() => {
            Doctor.create({
                crm: '',
                email: 'johndoe@email.com',
                specialityId: 'SPECIALITY_ID',
                userId: 'USER_ID',
            })
        }).toThrow('CRM is required');
    });
    
    test('Should not be able to register a doctor with invalid length CRM', () => {
    
        expect(() => {
            Doctor.create({
                crm: '12345',
                email: 'johndoe@email.com',
                specialityId: 'SPECIALITY_ID',
                userId: 'USER_ID',
            })
        }).toThrow('CRM length is incorrect');
    });
    
    test('Should not be able to register a doctor with invalid e-mail', () => {
    
        expect(() => {
            Doctor.create({
                crm: '123455',
                email: '',
                specialityId: 'SPECIALITY_ID',
                userId: 'USER_ID',
            })
        }).toThrow('E-mail is required');
    });
    
});
