// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Dessert = require('../models/Dessert');

module.exports = {
  // GET all desserts
  getAllDesserts: async function getAllDesserts(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const dessert = await Dessert.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Dessert fetched successfully',
        desserts: dessert,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one dessert
  getOneDessert: async function getOneDessert(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get dessert, empty request.' });
      else {
        const dessert = await Dessert.findOne({
          // Find one dessert by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Dessert fetched successfully',
          dessert,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one dessert
  postOneDessert: async function postOneDessert(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create dessert, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a dessert with body request
        const dessert = new Dessert({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          allergen: req.body.allergen,
          photo: req.body.photo,
        });

        await dessert.save(); // Save dessert

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New dessert created with success.',
          dessert,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one dessert
  deleteOneDessert: async function deleteOneDessert(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete dessert, empty request.' });
      else {
        const dessert = await Dessert.findOne({
          // Find one dessert by id
          _id: req.params.id,
        });
        await Dessert.deleteOne({
          // Delete one dessert
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          dessert,
          message: 'Dessert deleted',
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one dessert
  putOneDessert: async function putOneDessert(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put dessert, empty request.' });
      else {
        const dessert = await Dessert.findOne({
          // Find one dessert by id
          _id: req.params.id,
        });
        // Save data
        dessert.set({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          allergen: req.body.allergen,
          photo: req.body.photo,
        });

        await dessert.save();
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Dessert updated with success.',
          dessert,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
