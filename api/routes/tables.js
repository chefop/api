// Call all require
const express = require('express');

// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Table = require('../models/Table');

// Get all tables
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  Table.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((tables) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Tables fetched successfully',
        tables,
      });
    });
});

// Post one table
router.post('/', (req, res) => {
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
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New table created with success.',
          table,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a table
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete table, empty request.' });
  else {
    Table.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((table) => {
      Table.deleteOne({
        // Delete one table
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Tables deleted',
          table,
        });
      });
    });
  }
});

// Get one table
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get table, empty request.' });
  else {
    Table.findOne({
      // Find one table by id
      _id: req.params.id,
    }).then((table) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Table fetched successfully',
        table,
      });
    });
  }
});

// Update one table
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put table, empty request.' });
  else {
    Table.findOne({
      // Find one table by id
      _id: req.params.id,
    }).then((table) => {
      // Save data
      table.set({
        name: req.body.name,
        state: req.body.state,
        capacity: req.body.capacity,
      });

      table
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Table updated with success.',
            table,
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
