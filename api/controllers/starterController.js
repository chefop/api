// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Starter = require('../models/Starter');

module.exports = {
  // GET all starters
  getAllStarters: async function getAllStarters(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const starters = await Starter.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Starters fetched successfully',
        starters,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one starter
  getOneStarter: async function getOneStarter(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get starter, empty request.' });
      else {
        const starter = await Starter.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Starter fetched successfully',
          starter,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one starter
  postOneStarter: async function postOneStarter(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create starter, empty request.' });
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

        await starter.save(); // Save starter

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New starter created with success.',
          starter,
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
          .json({ message: 'Cannot delete starter, empty request.' });
      else {
        const starter = await Starter.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        await Starter.deleteOne({
          // Delete one starter
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Starter deleted',
          starter,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one starter
  putOneStarter: async function putOneStarter(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put starter, empty request.' });
      else {
        const starter = await Starter.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        // Save data
        starter.set({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          allergen: req.body.allergen,
          photo: req.body.photo,
        });

        await starter.save();

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Starter updated with success.',
          starter,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
