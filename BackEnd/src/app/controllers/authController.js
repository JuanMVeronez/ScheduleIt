import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mailer from '../../models/mailer'

import User from '../models/user';

const router = express.Router();

function generateToken(parm = {}) {
    const token = jwt.sign(parm, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24 // one day
    })
    return token
}

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        if(await User.findOne({email})) 
            return res.status(400).send({error: 'Email already registreded'})

        const user = await User.create({
            name: `${req.body.name} ${req.body.lastName}`,
            email: req.body.email,
            password: req.body.password,
        });

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

router.post('/forgot-password', async (req, res) => {
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

router.post('/reset-password', async (req, res) => {
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

router.get('/pick-user', async (req, res) => {
    let { token } = (!req.headers.authorization) && (req.body) 
    
    if (token === undefined ) token = req.headers.authorization
    
    let id;
    
    try {
        if (!token) {
            return res.status(401).send({ 'error': 'No token provided'});
        }
    
        const parts = token.split(' ');
    
        if (parts.length !== 2) {
            return res.status(401).send({ 'error': 'Token format error'});
        }
    
        const [ scheme, tokenParsed] = parts;
    
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ 'error': 'Start scheme error'});
        }
    
        jwt.verify(tokenParsed, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ 'error': 'Invalid token'});
            }
            id = decoded.id;
        });

        const user = await User.findById(id);

        res.send({user});
    } catch (err) {
        res.status(400).send({ error: 'Error on pick user, try again'})
    }
})

export default router;
