// Call all require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const utils = require('../../config/utils');

//Call model
const Drink = require('../models/Drink');

//Require Mogoose
const ObjectId = require("mongoose").Types.ObjectId;

// Get all drinks
router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.count) || 10; // Put a limit
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || false; // Get the request or false
    const drink = Drink
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 }).then(mainCourse => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Drinks fetched successfully',
                drink: drink
            });
        }).catch(err => { // If ko status 500 sans message
            res.status(500).json({ message: err.message });
        });
});

// Post one drink
router.post('/', (req, res, next) => {
    if (utils.requestIsEmpty(req.body)) { // Check if request body is empty
        res.status(400).json({ message: 'Cannot create drink, empty request.' }); // If enmpty status 400 and send message
    }
    // Create a drink with body request
    const drink = new Drink({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
        volume : req.body.volume,
        alcohol : req.body.alcohol,
        cold_drink : req.body.cold_drink,
    });

    drink
        .save() // Save drink
        .then(result => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'New drink created with success.',
                drinks: drink
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Delete a drink
router.delete('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot delete drink, empty request.' });
    }
    Drink.deleteOne({ // Delete one drink
        _id: req.params.id
    }).then(result => {
        res.status(200).json({ // If ok status 200 and send message
            success: true,
            message: 'Drink deleted'
        });
    }).catch(err => { // If ko status 500 and send message
        res.status(500).json({ message: err.message });
    });
});

// Get one drink
router.get('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get drink, empty request.' });
    }
    const drink = Drink
        .findOne({ // Find drink course by id
            _id: req.params.id
        })
        .then(drink => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Drink fetched successfully',
                drinks: drink
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

// Update one drink
router.put('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) { // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put drink, empty request.' });
    }
    const drink = Drink
        .findOne({ // Find one drink by id
            _id: req.params.id
        })
        .then(drink => { // Save data
            drink.name = req.body.name;
            drink.description = req.body.description;
            drink.df_price = req.body.df_price;
            drink.vat = req.body.vat;
            drink.quantity = req.body.quantity;
            drink.allergen = req.body.allergen;
            drink.photo = req.body.photo;
            drink.volume = req.body.volume;
            drink.alcohol = req.body.alcohol;
            drink.cold_drink = req.body.cold_drink;

            drink.save()
            .then(drink => {
                res.status(200).json({ // If ok status 200, send message and datas
                    message: 'Drink updated with success.',
                    drinks: drink
                });
            }).catch(err => { // If ko status 500 and send message
                res.status(500).json({ message: err.message });
            });
        }).catch(err => { // If ko status 500 and send message
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
