const mongoose = require('mongoose');

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    }
})

const TheaterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    Events: [EventSchema]
});

// Create models for each schema
const TheaterModel = mongoose.model('Theater', TheaterSchema)
const EventModel = mongoose.model('Event', EventSchema)

// Export each model so they can be required elsewhere
module.exports = {
    TheaterModel: TheaterModel,
    EventModel: EventModel
}