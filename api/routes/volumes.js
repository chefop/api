// Call all require
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Volume = require('../models/Volume');

// Require Mogoose
const ObjectId = require('mongoose').Types.ObjectId;

// Get all volumes
router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.count) || 10; // Put a limit
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || false; // Get the request or false
  const volumes = Volume.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((volumes) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'volumes fetched successfully',
        volumes: volumes,
      });
    });
});

// Post one volume
router.post('/', (req, res, next) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create volume, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a volume with body request
    const volume = new Volume({
      name: req.body.name,
    });

    volume
      .save() // Save volume
      .then((result) => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New volume created with success.',
          volume: volume,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a volume
router.delete('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete volume, empty request.' });
  else {
    const volume = Volume.findOne({
      // Find one volume by id
      _id: req.params.id,
    }).then((volume) => {
      Volume.deleteOne({
        // Delete one volume
        _id: req.params.id,
      }).then((result) => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Volume deleted',
          volume: volume,
        });
      });
    });
  }
});

// Get one volume
router.get('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get volume, empty request.' });
  else {
    const volume = Volume.findOne({
      // Find one volume by id
      _id: req.params.id,
    }).then((volume) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Volume fetched successfully',
        volume: volume,
      });
    });
  }
});

// Update one volume
router.put('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put volume, empty request.' });
  else {
    const volume = Volume.findOne({
      // Find one volume by id
      _id: req.params.id,
    }).then((volume) => {
      // Save data
      volume.name = req.body.name;

      volume
        .save()
        .then((volume) => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Volume updated with success.',
            volume: volume,
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
