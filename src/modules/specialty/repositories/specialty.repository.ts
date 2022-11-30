import { Specialty } from "@prisma/client";

interface ISpecialtyRepository {
    save(data: Specialty): Promise<Specialty>;
    findByName(name: string): Promise<Specialty | undefined>;
}

export { ISpecialtyRepository }
