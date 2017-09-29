const express = require('express')
const router = express.Router()

const Schema = require("../db/schema.js");
const TheaterModel = Schema.TheaterModel;


router.get('/', (request, response) => {


    TheaterModel.find({})
    .then((theaters) => {
        response.render('companies/index', {
            theaters: theaters
        })
    })
    .catch((error) => {
        console.log(error)
    })
})


router.get('/new', (request, response) => {
    response.render('theaters/new')
})

router.post('/', (request, response) => {
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