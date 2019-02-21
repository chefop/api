// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Drink = require('../models/Drink');

module.exports = {
  // GET all drinks
  getAllDrinks: async function getAllDrinks(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const drink = await Drink.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 })
        .populate({
          path: 'allergen volume',
        });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Drinks fetched successfully',
        drinks: drink,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one drink
  getOneDrink: async function getOneDrink(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get drink, empty request.' });
      else {
        const drink = await Drink.findOne({
          // Find drink course by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Drink fetched successfully',
          drink,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one drink
  postOneDrink: async function postOneDrink(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create drink, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a drink with body request
        const drink = new Drink({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          allergen: req.body.allergen,
          photo: req.body.photo,
          volume: req.body.volume,
          alcohol: req.body.alcohol,
          cold_drink: req.body.cold_drink,
        });

        await drink.save(); // Save drink

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New drink created with success.',
          drink,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one drink
  deleteOneDrink: async function deleteOneDrink(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete drink, empty request.' });
      else {
        const drink = await Drink.findOne({
          // Find drink course by id
          _id: req.params.id,
        });
        await Drink.deleteOne({
          // Delete one drink
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Drink deleted',
          drink,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one drink
  putOneDrink: async function putOneDrink(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put drink, empty request.' });
      else {
        const drink = await Drink.findOne({
          // Find one drink by id
          _id: req.params.id,
        });
        // Save data
        drink.set({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          allergen: req.body.allergen,
          photo: req.body.photo,
          volume: req.body.volume,
          alcohol: req.body.alcohol,
          cold_drink: req.body.cold_drink,
        });

        await drink.save();

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Drink updated with success.',
          drink,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
