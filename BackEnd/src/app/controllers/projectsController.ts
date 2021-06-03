import express from 'express';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);


type reqWithId = { userId: string;}
router.get('/', (req, res) => {
    res.send({OK : true, userId : req.userId})
})

module.exports = (app: express.Application) => app.use('/projects', router)