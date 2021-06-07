import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    userId: String,
    event: {creatorId: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        unique: true,
    },
    moreDetails: {
        type: String,
    },
    startDate: {
        type: Number,
        require: true
    },
    endDate : {
        type: Number,
    },
    allDay: {
        type: Boolean,
    },
    members: {
        type: Array,
    },
    eventType: {
        type: String,
    },
    rRule: {
        type: String,
    },
    guestsAccepted: {
        type: Array,
    }},
});

const SchEvent = mongoose.model('SchEvent', eventSchema);
export default SchEvent;