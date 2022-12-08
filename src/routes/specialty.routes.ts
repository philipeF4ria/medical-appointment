import { Router } from 'express';

import { ensureAuthenticate } from '../infra/shared/http/ensure-authenticate-middleware';
import { ensureAdmin } from '../infra/shared/http/ensure-admin.middleware';


import { createSpecialtyController } from '../modules/specialty/useCases/createSpecialty';

const specialtyRouter = Router();

specialtyRouter.post(
    '/specialties',
    ensureAuthenticate,
    ensureAdmin,
    async (request, response) => {
        await createSpecialtyController.handle(request, response);
});

export { specialtyRouter }
