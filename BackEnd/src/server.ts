import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({
        msg: 'Hello World!!',
        user: 'Juan',
    });
})

app.listen(3000);