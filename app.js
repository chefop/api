// Call all require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connexion to mogoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chefop', { useNewUrlParser: true });

// Parsing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Const products
const starters = require('./api/routes/starters');
const mainCourses = require('./api/routes/mainCourses');
const desserts = require('./api/routes/desserts');

// Router products
app.use('/starters', starters);
app.use('/mainCourses', mainCourses);
app.use('/desserts', desserts);

// Middleware
app.use((req, res, next) => {
    next();
})

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
