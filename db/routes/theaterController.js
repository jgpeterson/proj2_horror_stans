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