import { SpecialtyRepository } from '../../repositories/implementations/specialty.repository';

import { CreateSpecialtyController } from './create-specialty.controller';

const specialtyRepository = new SpecialtyRepository();

const createSpecialtyController = new CreateSpecialtyController(specialtyRepository);

export { createSpecialtyController }
