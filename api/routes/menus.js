// Call all require
const express = require('express');

// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const Menu = require('../models/Menu');

// Get all menus
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  Menu.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((menus) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Menus fetched successfully',
        menus,
      });
    });
});

// Post one menus
router.post('/', (req, res) => {
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

    menu
      .save() // Save menu
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New menu created with success.',
          menu,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a menu
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot delete menu, empty request.' });
  else {
    Menu.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((menu) => {
      Menu.deleteOne({
        // Delete one menu
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Menu deleted',
          menu,
        });
      });
    });
  }
});

// Get one menu
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get menu, empty request.' });
  else {
    Menu.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((menu) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Menu fetched successfully',
        menu,
      });
    });
  }
});

// Update one menu
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put menu, empty request.' });
  else {
    Menu.findOne({
      // Find one stater by id
      _id: req.params.id,
    }).then((menu) => {
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

      menu
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Menu updated with success.',
            menu,
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
