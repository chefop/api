// Call all require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const utils = require('../../config/utils');

//Call dessert
const Dessert = require('../models/Dessert');

//Require Mogoose
const ObjectId = require("mongoose").Types.ObjectId;

// Get all dessert
router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.count) || 10; // Put a limit
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || false; // Get the request or false
    const dessert = Dessert
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 }).then(dessert => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Dessert fetched successfully',
                desserts: dessert
            });
        }).catch(err => { // If ko status 500 sans message
            res.status(500).json({ message: err.message });
        });
});

// Post one dessert
router.post('/', (req, res, next) => {
    if (utils.requestIsEmpty(req.body)) { // Check if request body is empty
        res.status(400).json({ message: 'Cannot create dessert, empty request.' }); // If enmpty status 400 and send message
    }
    // Create a dessert with body request
    const dessert = new Dessert({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
    });

    dessert
        .save() // Save dessert
        .then(result => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'New dessert created with success.',
                dessert: dessert
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Delete a dessert
router.delete('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot delete dessert, empty request.' });
    }
    const dessert = Dessert
        .findOne({ // Find one main course by id
            _id: req.params.id
        })
        .then(dessert => {
            Dessert.deleteOne({ // Delete one dessert
                _id: req.params.id
            }).then(result => {
                res.status(200).json({ // If ok status 200 and send message
                    dessert: dessert,
                    message: 'Dessert deleted'
                });
            }).catch(err => { // If ko status 500 and send message
                res.status(500).json({ message: err.message });
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Get one dessert
router.get('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get dessert, empty request.' });
    }
    const dessert = Dessert
        .findOne({ // Find one main course by id
            _id: req.params.id
        })
        .then(dessert => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Dessert fetched successfully',
                dessert: dessert
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Update one dessert
router.put('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put dessert, empty request.' });
    }
    const dessert = Dessert
        .findOne({ // Find one dessert by id
            _id: req.params.id
        })
        .then(mainCourse => { // Save data
            dessert.name = req.body.name;
            dessert.description = req.body.description;
            dessert.df_price = req.body.df_price;
            dessert.vat = req.body.vat;
            dessert.quantity = req.body.quantity;
            dessert.allergen = req.body.allergen;
            dessert.photo = req.body.photo;

            dessert.save()
            .then(dessert => {
                res.status(200).json({ // If ok status 200, send message and datas
                    message: 'Dessert updated with success.',
                    dessert: dessert
                });
            }).catch(err => { // If ko status 500 and send message
                res.status(500).json({ message: err.message });
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
