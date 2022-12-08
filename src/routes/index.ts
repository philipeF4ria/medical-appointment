import { Router } from 'express';

import { doctorRouter } from './doctor.routes';
import { specialtyRouter } from './specialty.routes';
import { userRouter } from './user.routes';

const router = Router();

router.use(userRouter);
router.use(specialtyRouter);
router.use(doctorRouter);

export { router }
