const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chefop', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const starters = require('./api/routes/starters');

app.use((req, res, next) => {
    next();
})

app.use('/starters', starters);

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
