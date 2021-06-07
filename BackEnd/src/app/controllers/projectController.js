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

    const reqTitle = req.body.title;

    if(await SchEvent.findOne({reqTitle})) 
            return res.status(200)

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
    const eventDeleted = await SchEvent.findByIdAndDelete(eventId);

    res.send(eventDeleted);
})

router.patch('/event', async (req, res) => {
    const { 
        eventId,
        eventTitle,
        eventDisc,
        allDay,
        guests,
        guestsAccepted,
    } = req.body;
    
    let start = new Date();
    let end; 
    
    if (allDay) {
        start = start.getTime();
    } else {
        end = new Date().setHours(start.getHours() + 1);
    }

    try {
        await SchEvent.findByIdAndUpdate(eventId,{
            creatorId: req.userId,
            eventTitle,
            eventDisc,
            start,
            end,
            allDay,
            guests,
            guestsAccepted,
        });

        const eventChanged = await SchEvent.findById(eventId)
        
        return res.send(eventChanged);
    } catch (err) {
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