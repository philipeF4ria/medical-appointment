import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';

type DoctorProps = {
    crm: string;
    email: string;
    userId: string;
    especialityId: string;
}

class Doctor {
    id: string;
    crm: string;
    email: string;
    userId: string;
    especialityId: string;

    private constructor(props: DoctorProps) {
        this.id = randomUUID();
        this.crm = props.crm;
        this.email = props.email;
        this.userId = props.userId;
        this.especialityId = props.especialityId;
    }

    static create(props: DoctorProps) {
        if (!props.crm) {
            throw new CustomError('CRM is required', 400);
        }

        if (props.crm.length !== 6) {
            throw new CustomError('CRM length is incorrect', 400);
        }

        if (!props.email) {
            throw new CustomError('E-mail is required', 400);
        }

        const doctor = new Doctor(props);

        return doctor;
    }
}

export { DoctorProps, Doctor }
