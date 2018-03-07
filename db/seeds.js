require('dotenv').config();

// Database setup
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var TheaterModel = Schema.TheaterModel;
var EventModel = Schema.EventModel;

// Delete all Companies from the database
TheaterModel.remove({}, function (err) {
    console.log(err);
});

// Create some Companies and Snowboards
const Amc = new TheaterModel({ name: 'Amc', address: '619 Church St', location: "https://i.imgur.com/Ny0SuzJm.png"})
const Regal = new TheaterModel({ name: 'Regal', address: '425 Mary Way', location: "https://i.imgur.com/J90yo7hm.png"})
const Fox = new TheaterModel({ name: 'Fox', address: '1428 Elm Street', location: "https://i.imgur.com/yBPGBWLm.png"})

const comicCon = new EventModel({ name: 'Comic Con', type: 'Festival', date: '10/30/2017' })
const dragonCon = new EventModel({ name: 'Dragon Con', type: 'Festival', date: '10/31/2017' })
const starWars = new EventModel({ name: 'Star Wars', type: 'Festival', date: '10/29/2017' })

// Here we assign some snowboards to each company.
const theaters = [Amc, Regal, Fox]
const events = [comicCon, dragonCon, starWars]

theaters.forEach((theater) => {

    theater.events = events

    theater.save()
        .then((theaters) => {
            console.log(`${theater.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

// Disconnect from database
db.close();