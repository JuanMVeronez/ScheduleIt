import jwt from 'jsonwebtoken';

// type Next = () => void | Promise<void>;
// req: Request, res: Response, next: Next
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

    let secret_hash//: string;
    if (process.env.SECRET_KEY) {
        secret_hash = process.env.SECRET_KEY;
      } else {
        throw new Error("Secret hash environment variable is not set")
    }

    jwt.verify(token, secret_hash, (err, decoded) => {
        if (err) {
            return res.status(401).send({ 'error': 'Invalid token'});
        }
        req.userId = decoded.id;
        return next();
    });
}

export default authMiddleware;