import { Router } from 'express';

import { doctorRouter } from './doctor.routes';
import { specialtyRouter } from './specialty.routes';
import { userRouter } from './user.routes';
import { doctorInfoRouter } from './doctor-info.routes';
import { patientRouter } from './patient.routes';

const router = Router();

router.use(userRouter);
router.use(specialtyRouter);
router.use(doctorRouter);
router.use(doctorInfoRouter);
router.use(patientRouter)

export { router }
