import { CustomError } from '../../../errors/custom.error';
import { generateUUID } from '../../../utils/generateUUID';

type DoctorInfoProps = {
    duration: number;
    price: number;
    doctorId: string;
}

class DoctorInfo {
    id: string;
    duration: number;
    price: number;
    doctorId: string;

    private constructor(props: DoctorInfoProps) {
        if (!props.doctorId) {
            throw new CustomError('Doctor does not exists');
        }

        if (props.duration <= 0) {
            throw new CustomError('Invalid duration');
        }

        this.id = generateUUID();
        this.duration = props.duration;
        this.price = props.price
        this.doctorId = props.doctorId;
    }

    static create(props: DoctorInfoProps) {
        const doctorInfo = new DoctorInfo(props);

        return doctorInfo;
    }
}

export { DoctorInfoProps, DoctorInfo }
