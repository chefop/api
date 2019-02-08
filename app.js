// Call all require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');

// Connexion to mogoose
mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });

// Parsing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Const products
const starters = require('./api/routes/starters');
const mainCourses = require('./api/routes/mainCourses');
const desserts = require('./api/routes/desserts');
const drinks = require('./api/routes/drinks');
const allergen = require('./api/routes/allergens');

// Router products
app.use('/starters', starters);
app.use('/mainCourses', mainCourses);
app.use('/desserts', desserts);
app.use('/drinks', drinks);
app.use('/allergens', allergen);

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
