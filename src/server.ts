import 'dotenv/config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';
import { router } from './routes';

import './infra/cron/notification-appointment-day.cron';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(router)

app.listen(3333, () => console.log('Server is running on PORT 3333'));
