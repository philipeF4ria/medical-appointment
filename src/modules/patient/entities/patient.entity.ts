import { CustomError } from '../../../errors/custom.error';
import { generateUUID } from '../../../utils/generateUUID';

type PatientProps = {
    email: string;
    document: string;
    userId: string;
}

class Patient {
    userId: string;
    id: string;
    email: string;
    document: string;

    private constructor(props: PatientProps) {
        if (!props.email) {
            throw new CustomError('E-mail is required', 400);
        }

        if (!props.document || props.document.length <= 5) {
            throw new CustomError('Document is invalid', 400);
        }

        this.userId = props.userId;
        this.id = generateUUID();
        this.email = props.email;
        this.document = props.document;

    }

    static create(data: PatientProps) {
        const patient = new Patient(data);

        return patient;
    }
}

export { Patient }
