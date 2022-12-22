import { Router } from 'express';

import { 
    createDoctorScheduleController
 } from '../modules/doctor/useCases/create-doctor-schedule';
 
import { ensureAuthenticate } from '../infra/shared/http/ensure-authenticate-middleware';

const doctorScheduleRouter = Router();

doctorScheduleRouter.post('/doctor-schedule',
ensureAuthenticate,
 async (request, response) => {
    await createDoctorScheduleController.handle(request, response);
});

export { doctorScheduleRouter }
