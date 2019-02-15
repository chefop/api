// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Table = require('../models/Table');

module.exports = {
  // GET all table
  getAllTables: async function getAllTables(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const tables = await Table.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Tables fetched successfully',
        tables,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one table
  getOneTable: async function getOneTable(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get table, empty request.' });
      else {
        const table = await Table.findOne({
          // Find one table by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Table fetched successfully',
          table,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one table
  postOneTable: async function postOneTable(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create table, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a table with body request
        const table = new Table({
          name: req.body.name,
          state: req.body.state,
          capacity: req.body.capacity,
        });

        await table.save(); // Save table

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New table created with success.',
          table,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one starter
  deleteOneStarter: async function deleteOneStarter(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete table, empty request.' });
      else {
        const table = await Table.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        await Table.deleteOne({
          // Delete one table
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Tables deleted',
          table,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one table
  putOneTable: async function putOneTable(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put table, empty request.' });
      else {
        const table = await Table.findOne({
          // Find one table by id
          _id: req.params.id,
        });
        // Save data
        table.set({
          name: req.body.name,
          state: req.body.state,
          capacity: req.body.capacity,
        });

        await table.save();

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Table updated with success.',
          table,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
