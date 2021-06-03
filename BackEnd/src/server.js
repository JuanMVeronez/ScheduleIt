import express from 'express';
import authRouter from './app/controllers/authController';
import projectsRouter from './app/controllers/projectsController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)))
app.use('/auth', authRouter);
app.use('/projects', projectsRouter);

app.listen(process.env.PORT);

export default app;