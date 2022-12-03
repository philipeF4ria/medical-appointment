import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';

type ISpecialty = {
    name: string;
    description: string;
}

class Specialty {
    id: string;
    name: string;
    description: string;
    createdAt: Date;

    private constructor({ name, description }: ISpecialty) {
        this.name = name;
        this.description = description;
        this.createdAt = new Date();
        this.id = randomUUID();
    }

    static create(props: ISpecialty) {
        if (!props.name) {
            throw new CustomError('Specialty name is required', 400);
        }

        const specialty = new Specialty(props);
        return specialty;
    }
}

export { Specialty }
