const express = require('express');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

const login = require('./routes/login.js');
const register = require('./routes/register.js');

app.use(express.static(path.join(__dirname, './public')))
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));

app.use('/', login);
app.use('/register', register);

app.listen(port, () => {
    console.log('Listening to ' + port);
})