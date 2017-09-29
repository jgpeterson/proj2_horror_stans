const express = require('express')
const router = express.Router({ mergeParams: true })

const Schema = require("../db/schema.js");
const TheaterModel = Schema.TheaterModel;

router.get('/', (request, response) => {
    const theaterId = request.params.theaterId

    TheaterModel.findById(theaterId)
       .then((theater) => {
           response.render('events/index', {
               theater: theater
           })
       })
       .catch((error) => {
           console.log(error)
       })
})


router.get('/new', (request, response) => {
    
    const theaterId = request.params.theaterId

    response.render('events/new', {
        theaterId: theaterId
    })
})


router.post('/', (request, response) => {
    const theaterId = request.params.theaterId
    const newEvent = request.body

    TheaterModel.findById(theaterId)
        .then((theater) => {
            theater.events.push(newEvent)
            
            return theater.save()
        })
        .then((theater) => {
            response.redirect(`/theaters/${theaterId}/events`)
        })
})


router.get('/:eventId/edit', (request, response) => {
    
    const theaterId = request.params.theaterId
    const eventId = request.params.eventId

    TheaterModel.findById(theaterId)
        .then((theater) => {
            const event = theater.events.id(eventId)

            response.render('events/edit', {
                event: event,
                theaterId: theaterId
            })
        })
        .catch((error) => {
            console.log(error)
        })
})


router.put('/:eventId', (request, response) => {

    const theaterId = request.params.theaterId
    const eventId = request.params.eventId

    const updatedEvent = request.body

    TheaterModel.findById(theaterId)
        .then((company) => {
            const event = theater.events.id(eventId)

            event.name = updatedEvent.name
            event.address = updatedEvent.address

            return theaterId.save()
        })
        .then(() => {
            response.redirect(`/theaters/${theaterId}/events/${eventId}`)
        })
})


router.get('/:eventId', (request, response) => {

    const theaterId = request.params.theaterId
    const eventId = request.params.eventId

    TheaterModel.findById(theaterId)
        .then((theater) => {
            const event = theater.events.id(eventId)

        response.render('events/show', {
            event: event,
            theaterId: theaterId 
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/:eventId/delete', (request, response) => {
    
    const theaterId = request.params.theaterId 
    const eventId = request.params.eventId

    TheaterModel.findById(theaterId)
        .then((theater) => {
            const event = theater.events.id(eventId).remove()

            return theater.save()
        })
        .then(() => {
            response.redirect(`/theaters/${theaterId}/events`)
        })
})

module.exports = router