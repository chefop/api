// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Allergen = require('../models/Allergen');

module.exports = {
  // GET all allergens
  getAllAllergens: async function getAllAllergens(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const allergen = await Allergen.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Allergens fetched successfully',
        allergen,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one allergen
  getOneAllergen: async function getOneAllergen(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot get allergen, empty request.' });
      else {
        const allergen = await Allergen.findOne({
          // Find one allergen by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Allergen fetched successfully',
          allergen,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one allergen
  postOneAllergen: async function postOneAllergen(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create allergen, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a allergen with body request
        const allergen = new Allergen({
          name: req.body.name,
        });

        await allergen.save(); // Save allergen
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New allergen created with success.',
          allergen,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one allergen
  deleteOneAllergen: async function deleteOneAllergen(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete allergen, empty request.' });
      else {
        const findAllergen = await Allergen.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        await Allergen.deleteOne({
          // Delete one allergen
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Allergens deleted',
          findAllergen,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one allergen
  putOneAllergen: async function putOneAllergen(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot put allergen, empty request.' });
      else {
        const allergen = await Allergen.findOne({
          // Find one allergen by id
          _id: req.params.id,
        });
        // Save data
        allergen.set({
          name: req.body.name,
        });

        await allergen.save();
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Allergen updated with success.',
          allergen,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
