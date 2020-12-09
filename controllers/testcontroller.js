var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var Log = sequelize.import('../models/log');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
    res.send('Hey!! This is a test route for the Router() method in Express')
});


//POST /api/log/  POSTS a New Log
router.post('/api/log', function (req, res) {
    var owner = req.user.id;
    var result = req.body.results;
    var descriptions = req.body.descriptions;
    var definitions = req.body.definitions;


    Log.create({
        owner: owner,
        results: result,
        descriptions: descriptions,
        definitions: definitions
    })
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))

});


//GET /api/log/ Gets all the logs
router.get('/api/log', function (req, res) {
    var userid = req.user.id;

    Log.findAll({
        where: { owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});
//GET /api/log/:id  Gets a specific log
router.get('/api/log/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Log
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

//PUT /api/log/:id this updates
router.put('/api/log/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;
    var descriptions = req.body.descriptions;
    var results = req.body.results;
    var definitions = req.body.definitions;

    Log
        .update({
            descriptions: descriptions,
            definitions: definitions,
            results: results
        }, {
            where: {
                id: data,
                owner: userid
            }
        })


        .then(
            function updateSuccess(updatedLog) {
                res.json({
                    updatedLog
                });
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )
    console.log(req.user.id)
    console.log(req.params.id);
});

//DELETE /api/log/:id Deletes
router.delete('/api/log/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Log
        .destroy({
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSUccess(data) {
                res.send("you removed a log");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        );
});


module.exports = router;
