import { ISpecialtyRepository } from '../specialty.repository';

import { Specialty } from '../../entities/specialty.entity';

class SpecialtyMemoryRepository implements ISpecialtyRepository {
    private items: Specialty[] = [];

    async save(data: Specialty): Promise<Specialty> {
        this.items.push(data);

        return data; 
    }
    async findByName(name: string): Promise<Specialty | null> {
        return this.items.find(specialty => specialty.name === name) || null;
    }
    async findById(id: string): Promise<Specialty | null> {
        return this.items.find(specialty => specialty.id === id) || null;
    }

}

export { SpecialtyMemoryRepository }
