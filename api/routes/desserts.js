// Call all require
const express = require('express');

// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call dessert
const Dessert = require('../models/Dessert');

// Get all dessert
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  Dessert.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((dessert) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Dessert fetched successfully',
        desserts: dessert,
      });
    });
});

// Post one dessert
router.post('/', (req, res) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create dessert, empty request.' });
  // If enmpty status 400 and send message
  else {
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
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New dessert created with success.',
          dessert,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a dessert
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete dessert, empty request.' });
  else {
    Dessert.findOne({
      // Find one dessert by id
      _id: req.params.id,
    }).then((dessert) => {
      Dessert.deleteOne({
        // Delete one dessert
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          dessert,
          message: 'Dessert deleted',
        });
      });
    });
  }
});

// Get one dessert
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get dessert, empty request.' });
  else {
    Dessert.findOne({
      // Find one dessert by id
      _id: req.params.id,
    }).then((dessert) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Dessert fetched successfully',
        dessert,
      });
    });
  }
});

// Update one dessert
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put dessert, empty request.' });
  else {
    Dessert.findOne({
      // Find one dessert by id
      _id: req.params.id,
    }).then((dessert) => {
      // Save data
      dessert.set({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
      });

      dessert
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Dessert updated with success.',
            dessert,
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
