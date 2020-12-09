const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//POST /api/user/ signup
router.post('/api/user', function (req, res) {
    const username = req.body.user.username;
    const pass = req.body.user.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {

            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

//POST /api/login/

router.post('/api/login', function (req, res) {
    User.findOne({
        where: { username: req.body.user.username }
    }).then(
        function (user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "You failed to match" });
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate user" });
            }
        },
        function (err) {
            res.status(501).send({ error: "you failed to authenticate" })
        }
    );
});



module.exports = router;
