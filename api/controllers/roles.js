//const mysql = require('mysql')// mysql db package
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.getallroles = (req, res, next) => {

    models.Roles.findAll({}).then(function (result) {
        return res.status(201).json(result);
    }).catch(function (err) {
        //no results
        console.log("failed to get roles " + err)
        return res.sendStatus(500)
    });


    //return res.status(201).json(decoded);
}

exports.setrole = (req, res, next) => {
    models.Roles.build({
            Name: req.body.Name,
            RoleLock: req.body.RoleLock,
            AssignedOnly: req.body.AssignedOnly
        })
        .save()
        .then(function (task) {
            //add to the traders table
            res.status(201).json({
                message: 'Role added'
            });
        })
        .catch(function (err) {
            console.log("failed to insert new Role " + err)
            return res.sendStatus(500)
        });

    //return res.status(201).json(decoded);
}