// Call all require
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Baking = require('../models/Baking');

// Require Mogoose
const ObjectId = require('mongoose').Types.ObjectId;

// Get all bakings
router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.count) || 10; // Put a limit
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || false; // Get the request or false
  const bakings = Baking.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((bakings) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Bakings fetched successfully',
        bakings: bakings,
      });
    });
});

// Post one baking
router.post('/', (req, res, next) => {
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
      .then((result) => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New baking created with success.',
          baking: baking,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a baking
router.delete('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete baking, empty request.' });
  else {
    const baking = Baking.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((baking) => {
      Baking.deleteOne({
        // Delete one baking
        _id: req.params.id,
      }).then((result) => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Bakings deleted',
          baking: baking,
        });
      });
    });
  }
});

// Get one baking
router.get('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get baking, empty request.' });
  else {
    const baking = Baking.findOne({
      // Find one baking by id
      _id: req.params.id,
    }).then((baking) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Baking fetched successfully',
        baking: baking,
      });
    });
  }
});

// Update one baking
router.put('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put baking, empty request.' });
  else {
    const baking = Baking.findOne({
      // Find one baking by id
      _id: req.params.id,
    }).then((baking) => {
      // Save data
      baking.name = req.body.name;

      baking
        .save()
        .then((baking) => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Baking updated with success.',
            baking: baking,
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
