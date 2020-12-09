require('dotenv').config();

//EXPRESS
var express = require('express');
var app = express();

//CONTROLLER IMPORTS
var test = require('./controllers/testcontroller')
let user = require('./controllers/usercontroller')

//DB IMPORTS & SYNC
const sequelize = require('./db');
sequelize.sync();
// sequelize.sync({ force: true }); //this will reset your whole damn table.
app.use(express.json())

//MIDDLEWARE
app.use(require('./middleware/headers'));

//EXPOSED ROUTE
app.use('/user', user);

// PROTECTED ROUTE
app.use(require('./middleware/validate-session'));
app.use('/auth', test);

// app.listen(3000, function () {
//     console.log('Fuck this stupid backend bullshit...')
// });

// app.use('/test', test)

// app.use('/api/test', function (req, res) {
//     res.send("This is data from the /api/test endpoint. It's from the server.")
// });
app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));
