import express from 'express';
import projectsRouter from './app/controllers/projectsController';
import authRouter from './app/controllers/authController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/projects', projectsRouter);

app.listen(process.env.PORT);

export default app;