import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ 'error': 'No token provided'});
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).send({ 'error': 'Token format error'});
    }

    const [ scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ 'error': 'Start scheme error'});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ 'error': 'Invalid token'});
        }
        req.userId = decoded.id;
        return next();
    });
}

export default authMiddleware;