import { Router } from 'express';
import { freeSchedulesController } from '../modules/appointments/useCases/free-schedules';

const appointmentsRouter = Router();

appointmentsRouter.get('/appointments/free', async (request, response) => {
  await freeSchedulesController.handle(request, response);
});

export { appointmentsRouter }
