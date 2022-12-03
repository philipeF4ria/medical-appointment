import { CustomError } from "../../../../errors/custom.error";
import { Specialty } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../../repositories/specialty.repository";

type SpecialtyRequest = {
    name: string;
    description: string;
}

class CreateSpecialtyUseCase {
    constructor(private specialtyRepository: ISpecialtyRepository){}

    async execute(data: SpecialtyRequest) {
        const specialtyExist = await this.specialtyRepository.findByName(data.name);

        if (specialtyExist) {
            throw new CustomError('Specialty already exists', 400);
        }

        const specialty = Specialty.create(data);

        const specialtyCreated = await this.specialtyRepository.save(specialty);

        return specialtyCreated;
    }
}

export { CreateSpecialtyUseCase }
