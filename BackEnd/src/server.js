import express from 'express';
import projectRouter from './app/controllers/projectController';
import authRouter from './app/controllers/authController';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/project', projectRouter);

app.listen(process.env.PORT);

export default app;