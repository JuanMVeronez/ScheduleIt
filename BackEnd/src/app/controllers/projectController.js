import express from 'express';

import authMiddleware from '../middlewares/auth';
import SchEvent from '../models/event';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    return res.send();
})

// CRUD event
router.post('/event', async (req, res) => {
    const gettedEvent = {event :req.body, userId: req.userId}
    
    try {
        const newEvent = await SchEvent.create(gettedEvent);

        return res.send(newEvent);
    } catch (err) {
        return res.status(400).send({ 'error': 'event not created, try again' });
    }
})

router.get('/event', async (req, res) => {
    
    const eventsWithUser = await SchEvent.find({userId:  req.userId}).select();

    res.send(eventsWithUser);
})

router.delete('/event', async (req, res) => {
    const {eventId} = req.body;
    
    if (!eventId) res.status(400).send({error: 'Id not sended'}) 
    
    await SchEvent.findByIdAndDelete(eventId).then((doc, err) => {
        res.send(doc);
    })
    res.send();
})

router.patch('/event', async (req, res) => {
    const gettedEvent = req.body.event
    const eventId = req.body.id
    const oldEvent = await SchEvent.findById(eventId);

    const margedEvent = ({ ...oldEvent.event, ...gettedEvent });

    try {    
        const eventChanged = await SchEvent.findByIdAndUpdate(eventId, {event: margedEvent}, {new: true});
        
        return res.send(eventChanged);
    } catch (err) {
        console.log(err)
        return res.status(400).send({ 'error': 'event not created, try again' });
    }
})

router.patch('/event-response', async (req, res) => {
    const { 
        eventId, 
        userState,
        userId,
    } = req.body;
    // const { userId } = req.userId;
    
    const eventWithUser = await SchEvent.findById(eventId);
    
    const userIndexInEvent = eventWithUser.guests.indexOf(userId)
    eventWithUser.guestsAccepted[ userIndexInEvent ] = userState;

    await SchEvent.findByIdAndUpdate(eventId, eventWithUser)
    
    return res.send(eventWithUser)
})

export default router;