const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

dotenv.config({ path: './config.env' });

// const User = require('./model/userSchema');

const PORT = process.env.PORT;

// DB connection
require('./db/conn');

// to make sure app understand json data and show (convert json to object)
app.use(express.json()); // middleware use

// link the router files to make our route easy
app.use(require('./router/auth'));

// Middleware

const middleware = (req, res, next) => {
    console.log("Hello from Middleware");
    next();
}

// middleware();

// Routing
app.get('/', (req, res) => {
    res.send('Hello from Server app.js');
});

app.get('/about', middleware, (req, res) => {
    res.send('Hello from About');
});
app.get('/contact', (req, res) => {
    res.send('Hello from Contact');
});
app.get('/signin', (req, res) => {
    res.send('Hello from Signin');
});
app.get('/signup', (req, res) => {
    res.send('Hello from Registration');
});

// console.log("Console Output");
app.listen(3000, () => {
    console.log(`Server Running at port ${PORT}`);
}) 