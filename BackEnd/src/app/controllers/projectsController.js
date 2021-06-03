import express from 'express';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({OK : true, userId : req.userId})
})

export default router;
