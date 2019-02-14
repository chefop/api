// Call all require
const express = require('express');
// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Allergen = require('../models/Allergen');

// Get all allergens
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  Allergen.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((allergens) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Allergens fetched successfully',
        allergens,
      });
    });
});

// Post one allergen
router.post('/', (req, res) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create allergen, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a allergen with body request
    const allergen = new Allergen({
      name: req.body.name,
    });

    allergen
      .save() // Save allergen
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New allergen created with success.',
          allergen,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a allergen
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete allergen, empty request.' });
  else {
    Allergen.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((allergen) => {
      Allergen.deleteOne({
        // Delete one allergen
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Allergens deleted',
          allergen,
        });
      });
    });
  }
});

// Get one allergen
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get allergen, empty request.' });
  else {
    Allergen.findOne({
      // Find one allergen by id
      _id: req.params.id,
    }).then((allergen) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Allergen fetched successfully',
        allergen,
      });
    });
  }
});

// Update one allergen
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put allergen, empty request.' });
  else {
    Allergen.findOne({
      // Find one allergen by id
      _id: req.params.id,
    }).then((allergen) => {
      // Save data
      allergen.set({
        name: req.body.name,
      });

      allergen
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Allergen updated with success.',
            allergen,
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
