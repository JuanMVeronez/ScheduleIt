import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    creatorId: {
        type: String,
        require: true,
    },
    eventTitle: {
        type: String,
        require: true,
    },
    eventDisc: {
        type: String,
    },
    start: {
        type: Date,
        require: true
    },
    end : {
        type: Date,
    },
    allDay: {
        type: Boolean,
    },
    guests: {
        type: Array,
    },
    guestsAccepted: {
        type: Array,
    },
});

const SchEvent = mongoose.model('SchEvent', eventSchema);
export default SchEvent;