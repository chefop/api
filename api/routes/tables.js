// Call all require
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Table = require('../models/Table');

// Require Mogoose
const ObjectId = require('mongoose').Types.ObjectId;

// Get all tables
router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.count) || 10; // Put a limit
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || false; // Get the request or false
  const tables = Table.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((tables) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Tables fetched successfully',
        tables: tables,
      });
    });
});

// Post one table
router.post('/', (req, res, next) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res.status(400).json({ message: 'Cannot create table, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a table with body request
    const table = new Table({
      name: req.body.name,
      state: req.body.state,
      capacity: req.body.capacity,
    });

    table
      .save() // Save table
      .then((result) => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New table created with success.',
          table: table,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a table
router.delete('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete table, empty request.' });
  else {
    const table = Table.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((table) => {
      Table.deleteOne({
        // Delete one table
        _id: req.params.id,
      }).then((result) => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Tables deleted',
          table: table,
        });
      });
    });
  }
});

// Get one table
router.get('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get table, empty request.' });
  else {
    const table = Table.findOne({
      // Find one table by id
      _id: req.params.id,
    }).then((table) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Table fetched successfully',
        table: table,
      });
    });
  }
});

// Update one table
router.put('/:id', (req, res, next) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put table, empty request.' });
  else {
    const table = Table.findOne({
      // Find one table by id
      _id: req.params.id,
    }).then((table) => {
      // Save data
      table.name = req.body.name;
      table.state = req.body.state;
      table.capacity = req.body.capacity;

      table
        .save()
        .then((table) => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Table updated with success.',
            table: table,
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
