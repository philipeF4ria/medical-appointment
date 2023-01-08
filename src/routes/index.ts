import { Router } from 'express';

import { doctorRouter } from './doctor.routes';
import { specialtyRouter } from './specialty.routes';
import { userRouter } from './user.routes';
import { doctorInfoRouter } from './doctor-info.routes';
import { patientRouter } from './patient.routes';
import { doctorScheduleRouter } from './doctor-schedule.routes';
import { appointmentsRouter } from './appointments.routes';

const router = Router();

router.use(userRouter);
router.use(specialtyRouter);
router.use(doctorRouter);
router.use(doctorInfoRouter);
router.use(patientRouter);
router.use(doctorScheduleRouter);
router.use(appointmentsRouter);

export { router }
