import { Specialty } from "@prisma/client";

interface ISpecialtyRepository {
    save(data: Specialty): Promise<Specialty>
}

export { ISpecialtyRepository }
