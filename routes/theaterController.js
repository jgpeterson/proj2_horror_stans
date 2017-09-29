const express = require('express')
const router = express.Router({mergeParams: true})

const Schema = require("../db/schema.js");
const TheaterModel = Schema.TheaterModel;


router.get('/', (request, response) => {


    TheaterModel.find({})
    .then((theaters) => {
        response.render('theaters/index', {
            theaters: theaters
        })
    })
    .catch((error) => {
        console.log(error)
    })
})


//new 

router.get('/new', (request, response) => {
    response.render('theaters/new')
})



router.post('/', (request, response) => {
    console.log('route hit')
    const newTheater = request.body

    TheaterModel.create(newTheater)
    .then(() => {
        response.redirect('/theaters')
    })
    .catch((error) => {
        console.log(error)
    })
})


router.get('/:theaterId/edit', (request, response) => {
    const theaterId = request.params.theaterId

    TheaterModel.findById(theaterId)
    .then((theater) => {
        response.render('theaters/edit', {
            theater: theater
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

router.put('/:theaterId', (request, response) => {
    const theaterId = request.params.theaterId
    const updatedTheater = request.body

    TheaterModel.findByIdAndUpdate(theaterId, updatedTheater, { new: true})
    .then(() => {
        response.redirect(`/theaters/${theaterId}`)
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/:theaterId', (request, response) => {

    const theaterId = request.params.theaterId

    TheaterModel.findById(theaterId)
        .then((theater) => {
            response.render('theaters/show', {
                theater: theater
            })
        })
        .catch((error) => {
            console.log(error)
        })
})


router.get('/:theaterId/delete', (request, response) => {
    const theaterId = request.params.theaterId

    TheaterModel.findByIdAndRemove(theaterId)
    .then(() => {
        response.redirect('/theaters')
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router