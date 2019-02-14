// Call all require
const express = require('express');

// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Baking = require('../models/Baking');

// Get all bakings
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  Baking.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((bakings) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Bakings fetched successfully',
        bakings,
      });
    });
});

// Post one baking
router.post('/', (req, res) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create baking, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a baking with body request
    const baking = new Baking({
      name: req.body.name,
    });

    baking
      .save() // Save baking
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New baking created with success.',
          baking,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a baking
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete baking, empty request.' });
  else {
    Baking.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((baking) => {
      Baking.deleteOne({
        // Delete one baking
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Bakings deleted',
          baking,
        });
      });
    });
  }
});

// Get one baking
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get baking, empty request.' });
  else {
    Baking.findOne({
      // Find one baking by id
      _id: req.params.id,
    }).then((baking) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Baking fetched successfully',
        baking,
      });
    });
  }
});

// Update one baking
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put baking, empty request.' });
  else {
    Baking.findOne({
      // Find one baking by id
      _id: req.params.id,
    }).then((baking) => {
      // Save data
      baking.set({
        name: req.body.name,
      });

      baking
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Baking updated with success.',
            baking,
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
