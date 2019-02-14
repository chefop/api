// Call all require
const express = require('express');

// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Drink = require('../models/Drink');

// Get all drinks
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  Drink.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((drink) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Drinks fetched successfully',
        drinks: drink,
      });
    });
});

// Post one drink
router.post('/', (req, res) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create drink, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a drink with body request
    const drink = new Drink({
      name: req.body.name,
      description: req.body.description,
      df_price: req.body.df_price,
      vat: req.body.vat,
      quantity: req.body.quantity,
      allergen: req.body.allergen,
      photo: req.body.photo,
      volume: req.body.volume,
      alcohol: req.body.alcohol,
      cold_drink: req.body.cold_drink,
    });

    drink
      .save() // Save drink
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New drink created with success.',
          drink,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a drink
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete drink, empty request.' });
  else {
    Drink.findOne({
      // Find drink course by id
      _id: req.params.id,
    }).then((drink) => {
      Drink.deleteOne({
        // Delete one drink
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Drink deleted',
          drink,
        });
      });
    });
  }
});

// Get one drink
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get drink, empty request.' });
  else {
    Drink.findOne({
      // Find drink course by id
      _id: req.params.id,
    }).then((drink) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Drink fetched successfully',
        drink,
      });
    });
  }
});

// Update one drink
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put drink, empty request.' });
  else {
    Drink.findOne({
      // Find one drink by id
      _id: req.params.id,
    }).then((drink) => {
      // Save data
      drink.set({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
        volume: req.body.volume,
        alcohol: req.body.alcohol,
        cold_drink: req.body.cold_drink,
      });

      drink
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Drink updated with success.',
            drink,
          });
        })
        .catch((err) => {
          // If ko status 500 and send message
          res.status(500).json({ message: err.message });
        });
    });
  }
});

module.exports = router;
