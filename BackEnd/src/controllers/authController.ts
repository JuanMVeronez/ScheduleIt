import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

const router = express.Router();

function generateToken(parm = {}) {
    let secret_hash: string;
    if (process.env.SECRET_KEY) {
        secret_hash = process.env.SECRET_KEY;
      } else {
        throw new Error("Secret hash environment variable is not set")
    }

    const token = jwt.sign(parm, secret_hash, {
        expiresIn: 60 * 60 * 24 // one day
    })
    return token
}

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        if(await User.findOne({email})) 
            return res.status(400).send({error: 'Email already registreded'})

        const user = await User.create(req.body);

        user.password = undefined
        
        return res.send({ 
            user,
            token: generateToken({ id: user.id}),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authentication', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({ error: 'User not found' });

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password'});
    }

    user.password = undefined;

    return res.send({
        user, 
        token: generateToken({ id: user.id}),
    });
});

module.exports = (app: express.Application) => app.use('/auth', router)