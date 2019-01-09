//const mysql = require('mysql')// mysql db package
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.getallregions = (req, res, next) => {

    models.Regions.findAll({
    }).then(function (result) {
        return res.status(201).json(result);
    }).catch(function (err) {
        //no results
        console.log("failed to get regions " + err)
        return res.sendStatus(500)
    });


    //return res.status(201).json(decoded);
}

exports.setregion = (req, res, next) => {
    models.Regions.build({
        Name: req.body.Name
    })
    .save()
    .then(function (task) {
        //add to the traders table
        res.status(201).json({
            message: 'Region added'
        });
    })
    .catch(function (err) {
        console.log("failed to insert new Region " + err)
        return res.sendStatus(500)
    });

    //return res.status(201).json(decoded);
}