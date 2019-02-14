// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Baking = require('../models/Baking');

module.exports = {
  // GET all allergens
  getAllBakings: async function getAllBakings(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const bakings = await Baking.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Bakings fetched successfully',
        bakings,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one allergens
  getOneBaking: async function getOneBakings(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get baking, empty request.' });
      else {
        const baking = await Baking.findOne({
          // Find one baking by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Baking fetched successfully',
          baking,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one allergens
  postOneBaking: async function postOneBaking(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create baking, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a baking with body request
        const baking = new Baking({
          name: req.body.name,
        });

        await baking.save(); // Save baking
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New baking created with success.',
          baking,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one allergens
  deleteOneBaking: async function deleteOneBaking(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete baking, empty request.' });
      else {
        const baking = await Baking.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        await Baking.deleteOne({
          // Delete one baking
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Bakings deleted',
          baking,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one allergens
  putOneBaking: async function putOneBaking(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put baking, empty request.' });
      else {
        const baking = await Baking.findOne({
          // Find one baking by id
          _id: req.params.id,
        });
        // Save data
        baking.set({
          name: req.body.name,
        });

        await baking.save();

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Baking updated with success.',
          baking,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
