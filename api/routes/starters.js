// Call all require
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Starter = require('../models/Starter');

// Require Mogoose
const ObjectId = require('mongoose').Types.ObjectId;

// Get all starters
router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.count) || 10; // Put a limit
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || false; // Get the request or false
  const starters = Starter.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((starters) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Starters fetched successfully',
        starters: starters,
      });
    });
});

// Post one starter
router.post('/', (req, res, next) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create starter, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a starter with body request
    const starter = new Starter({
      name: req.body.name,
      description: req.body.description,
      df_price: req.body.df_price,
      vat: req.body.vat,
      quantity: req.body.quantity,
      allergen: req.body.allergen,
      photo: req.body.photo,
    });

    starter
      .save() // Save starter
      .then((result) => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New starter created with success.',
          starter: starter,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a starter
router.delete('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete starter, empty request.' });
  else {
    const starter = Starter.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((starter) => {
      Starter.deleteOne({
        // Delete one starter
        _id: req.params.id,
      }).then((result) => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Starter deleted',
          starter: starter,
        });
      });
    });
  }
});

// Get one starter
router.get('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get starter, empty request.' });
  else {
    const starter = Starter.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((starter) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Starter fetched successfully',
        starter: starter,
      });
    });
  }
});

// Update one starter
router.put('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put starter, empty request.' });
  else {
    const starter = Starter.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((starter) => {
      // Save data
      starter.name = req.body.name;
      starter.description = req.body.description;
      starter.df_price = req.body.df_price;
      starter.vat = req.body.vat;
      starter.quantity = req.body.quantity;
      starter.allergen = req.body.allergen;
      starter.photo = req.body.photo;

      starter
        .save()
        .then((starter) => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Starter updated with success.',
            starter: starter,
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
