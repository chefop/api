// Call all require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const utils = require('../../config/utils');

//Call model
const Allergen = require('../models/Allergen');

//Require Mogoose
const ObjectId = require("mongoose").Types.ObjectId;

// Get all allergens
router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.count) || 10; // Put a limit
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || false; // Get the request or false
    const allergens = Allergen
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 }).then(allergens => {
            res.status(200).json({ // If ok status 200, send message and datas
                message: 'Allergens fetched successfully',
                allergens: allergens
            });
        });
});

// Post one allergen
router.post('/', (req, res, next) => {
    if (utils.requestIsEmpty(req.body))  // Check if request body is empty
        res.status(400).json({ message: 'Cannot create allergen, empty request.' }); // If enmpty status 400 and send message
    else{
      // Create a allergen with body request
      const allergen = new Allergen({
          name: req.body.name,
      });

      allergen
          .save() // Save allergen
          .then(result => {
              res.status(200).json({ // If ok status 200, send message and datas
                  message: 'New allergen created with success.',
                  allergen: allergen
              });
          }).catch(err => { // If ko status 500 and send message
              res.status(500).json({ message: err.message });
          });
    }
});

// Delete a allergen
router.delete('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot delete allergen, empty request.' });
    else {
      const allergen = Allergen
          .findOne({ // Find one stater by id
              _id: req.params.id
          })
          .then(allergen => {
              Allergen.deleteOne({ // Delete one allergen
                  _id: req.params.id
              }).then(result => {
                  res.status(200).json({ // If ok status 200 and send message
                      message: 'Allergens deleted',
                      allergen: allergen
                  });
              });
          });
    }
});

// Get one allergen
router.get('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))  // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get allergen, empty request.' });
    else{
      const allergen = Allergen
          .findOne({ // Find one allergen by id
              _id: req.params.id
          })
          .then(allergen => {
              res.status(200).json({ // If ok status 200, send message and datas
                  message: 'Allergen fetched successfully',
                  allergen: allergen
              });
          });
    }
});

// Update one allergen
router.put('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))  // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put allergen, empty request.' });
    else{
      const allergen = Allergen
          .findOne({ // Find one allergen by id
              _id: req.params.id
          })
          .then(allergen => { // Save data
              allergen.name = req.body.name;

              allergen.save()
              .then(allergen => {
                  res.status(200).json({ // If ok status 200, send message and datas
                      message: 'Allergen updated with success.',
                      allergen: allergen
                  });
              }).catch(err => { // If ko status 500 and send message
                  res.status(500).json({ message: err.message });
              });
          });
    }
});

module.exports = router;
