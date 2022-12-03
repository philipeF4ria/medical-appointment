import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';

type DoctorProps = {
    crm: string;
    email: string;
    userId: string;
    specialityId: string;
}

class Doctor {
    id: string;
    crm: string;
    email: string;
    userId: string;
    specialityId: string;

    private constructor(props: DoctorProps) {
        this.id = randomUUID();
        this.crm = props.crm;
        this.email = props.email;
        this.userId = props.userId;
        this.specialityId = props.specialityId;
    }

    static create(props: DoctorProps) {
        if (!props.crm) {
            throw new CustomError('CRM is required', 400);
        }

        if (props.crm.length !== 6) {
            throw new CustomError('CRM length is incorrect');
        }

        if (!props.email) {
            throw new CustomError('E-mail is required', 400);
        }

        const doctor = new Doctor(props);

        return doctor;
    }
}

export { DoctorProps, Doctor }
