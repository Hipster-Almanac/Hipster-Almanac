const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensureAuth')();
const cors = require('cors')();

//require in routers
const auth = require('./routes/auth');
const chores = require('./routes/chores');
const houses = require('./routes/houses');
const users = require('./routes/users');



app.use(morgan('dev'));

app.use(cors);
app.use(express.static('./public'));


//add api routes here
app.use('/api/auth', auth);
app.use('/api/chores', ensureAuth, chores);
app.use('/api/houses', ensureAuth, houses);
app.use('/api/users', ensureAuth, users);

app.use(errorHandler);

module.exports = app;
