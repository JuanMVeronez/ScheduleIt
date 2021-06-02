import express from 'express';

import User from '../models/user';

const router: express.Router = express.Router();

router.post('/register', async (req: express.Request, res: express.Response) => {
    const { email } = req.body

    try {
        if(await User.findOne({email})) 
            return res.status(400).send({error: 'Email already registreded'})

        const user = await User.create(req.body);

        user.password = undefined
        
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

module.exports = (app: express.Application) => app.use('/auth', router)