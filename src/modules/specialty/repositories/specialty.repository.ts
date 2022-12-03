import { Specialty } from "@prisma/client";

interface ISpecialtyRepository {
    save(data: Specialty): Promise<Specialty>;
    findByName(name: string): Promise<Specialty | null>;
    findById(id: string): Promise<Specialty | null>;
}

export { ISpecialtyRepository }
