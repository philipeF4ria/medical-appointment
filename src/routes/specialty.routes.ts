import { Router } from 'express';

import { createSpecialtyController } from '../modules/specialty/useCases/createSpecialty';

const specialtyRouter = Router();

specialtyRouter.post('/specialties', async (request, response) => {
    await createSpecialtyController.handle(request, response);
});

export { specialtyRouter }
