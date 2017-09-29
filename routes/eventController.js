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