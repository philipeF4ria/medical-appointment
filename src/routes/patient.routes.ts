import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload.config';

import { createPatientController } from '../modules/patient/useCases/create-patient';

const patientRouter = Router();

const upload = multer(uploadConfig);

patientRouter.post('/patients', upload.single('avatar'), async (request, response) => {
    await createPatientController.handle(request, response);
});

export { patientRouter }
