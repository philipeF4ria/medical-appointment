import { Router } from 'express';

import { freeSchedulesController } from '../modules/appointments/useCases/free-schedules';
import { createAppointmentController } from '../modules/appointments/useCases/create-appointment';
import { ensureAuthenticate } from '../infra/shared/http/ensure-authenticate-middleware';

const appointmentsRouter = Router();

appointmentsRouter.get('/appointments/free', async (request, response) => {
  await freeSchedulesController.handle(request, response);
});

appointmentsRouter.post('/appointments', ensureAuthenticate, async (request, response) => {
  await createAppointmentController.handle(request, response);
})

export { appointmentsRouter }
