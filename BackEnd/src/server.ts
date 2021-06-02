import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/authController')(app);

app.listen(process.env.PORT);