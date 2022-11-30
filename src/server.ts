import 'dotenv/config';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { specialtyRouter } from './routes/specialty.routes';
import { userRouter } from './routes/user.routes';

import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(userRouter);
app.use(specialtyRouter)

app.listen(3333, () => console.log('Server is running on PORT 3333'));
