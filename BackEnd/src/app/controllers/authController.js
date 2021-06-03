import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mailer from '../../models/mailer'

import User from '../models/user';

const router = express.Router();

function generateToken(parm = {}) {
    let secret_hash//: string;
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

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email})

        if (!user) return res.status(400).send({ error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set' : {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        })
        mailer.sendMail({
            to: email,
            subject: 'Recuperação de senha',
            from: 'juan.monteirov@email.com',
            html: `<p>Para recuperar sua senha use o token: ${token}</p>`,
            text: `Para recuperar sua senha use o token: ${token}`,
        }, err => {
            if (err) return res.status(400).send({ error: 'Cannot send forgot password email'})
            
            return res.send();
        })
    } catch (err) {
        res.status(400).send({ error: 'Error on forgot password, try again'})
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;
    
    try{
        const  user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');
        
        if (!user) return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token unexpected' });
        
        const now = new Date();
        
        if (now > user.passwordResetExpires) 
            return res.status(400).send({ error: 'Token has expired'})
        
        user.password = password;

        await user.save();
        res.send({ sucess: 'password changed'});
    } catch (err) {
        res.status(400).send({ error: 'Error on reset password, try again'})
    }
});

export default router;
