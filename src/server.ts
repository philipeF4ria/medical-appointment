import 'dotenv/config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(router)

app.listen(3333, () => console.log('Server is running on PORT 3333'));
