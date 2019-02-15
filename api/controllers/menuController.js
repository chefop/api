// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Menu = require('../models/Menu');

module.exports = {
  // GET all menus
  getAllMenus: async function getAllMenus(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const menus = await Menu.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Menus fetched successfully',
        menus,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one menu
  getOneMenu: async function getOneMenu(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get menu, empty request.' });
      else {
        const menu = await Menu.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Menu fetched successfully',
          menu,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one menu
  postOneMenu: async function postOneMenu(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res.status(400).json({ message: 'Cannot create menu, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a menu with body request
        const menu = new Menu({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          starter: req.body.starter,
          mainCourse: req.body.mainCourse,
          dessert: req.body.dessert,
        });

        await menu.save(); // Save menu

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New menu created with success.',
          menu,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one menu
  deleteOneMenu: async function deleteOneMenu(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot delete menu, empty request.' });
      else {
        const menu = await Menu.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        await Menu.deleteOne({
          // Delete one menu
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Menu deleted',
          menu,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one menu
  putOneMenu: async function putOneMenu(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put menu, empty request.' });
      else {
        const menu = await Menu.findOne({
          // Find one stater by id
          _id: req.params.id,
        });
        // Save data
        menu.set({
          name: req.body.name,
          description: req.body.description,
          df_price: req.body.df_price,
          vat: req.body.vat,
          quantity: req.body.quantity,
          starter: req.body.starter,
          mainCourse: req.body.mainCourse,
          dessert: req.body.dessert,
        });

        await menu.save().then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Menu updated with success.',
            menu,
          });
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
