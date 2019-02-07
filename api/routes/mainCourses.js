// Call all require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const utils = require('../../config/utils');

//Call model
const MainCourse = require('../models/MainCourse');

//Require Mogoose
const ObjectId = require("mongoose").Types.ObjectId;

// Get all main course
router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.count) || 10; // Put a limit
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || false; // Get the request or false
    const mainCourse = MainCourse
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 }).then(mainCourse => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Main courses fetched successfully',
                mainCourses: mainCourse
            });
        }).catch(err => { // If ko status 500 sans message
            res.status(500).json({ message: err.message });
        });
});

// Post one main course
router.post('/', (req, res, next) => {
    if (utils.requestIsEmpty(req.body)) { // Check if request body is empty
        res.status(400).json({ message: 'Cannot create main course, empty request.' }); // If enmpty status 400 and send message
    }
    // Create a main course with body request
    const mainCourse = new MainCourse({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
        baking: req.body.baking,
    });

    mainCourse
        .save() // Save main course
        .then(result => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'New main course created with success.',
                mainCourse: mainCourse
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Delete a main course
router.delete('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot delete main course, empty request.' });
    }
    const mainCourse = MainCourse
        .findOne({ // Find one main course by id
            _id: req.params.id
        })
        .then(mainCourse => {
            MainCourse.deleteOne({ // Delete one main course
                _id: req.params.id
            }).then(result => {
                res.status(200).json({ // If ok status 200 and send message
                    message: 'Main course deleted',
                    mainCourse: mainCourse
                });
            }).catch(err => { // If ko status 500 and send message
                res.status(500).json({ message: err.message });
            });
        });
});

// Get one main course
router.get('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get main course, empty request.' });
    }
    const mainCourse = MainCourse
        .findOne({ // Find one main course by id
            _id: req.params.id
        })
        .then(mainCourse => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Main course fetched successfully',
                mainCourse: mainCourse
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Update one main course
router.put('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put main course, empty request.' });
    }
    const mainCourse = MainCourse
        .findOne({ // Find one main course by id
            _id: req.params.id
        })
        .then(mainCourse => { // Save data
            mainCourse.name = req.body.name;
            mainCourse.description = req.body.description;
            mainCourse.df_price = req.body.df_price;
            mainCourse.vat = req.body.vat;
            mainCourse.quantity = req.body.quantity;
            mainCourse.allergen = req.body.allergen;
            mainCourse.photo = req.body.photo;
            mainCourse.baking = req.body.baking;

            mainCourse.save()
            .then(mainCourse => {
                res.status(200).json({ // If ok status 200, send message and datas
                    message: 'Main course updated with success.',
                    mainCourse: mainCourse
                });
            }).catch(err => { // If ko status 500 and send message
                res.status(500).json({ message: err.message });
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
