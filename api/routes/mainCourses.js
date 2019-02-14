// Call all require
const express = require('express');

// Require Mogoose
const { ObjectId } = require('mongoose').Types;

const router = express.Router();
const utils = require('../../config/utils');

// Call model
const MainCourse = require('../models/MainCourse');

// Get all main course
router.get('/', (req, res) => {
  const limit = parseInt(req.query.count, 10) || 10; // Put a limit
  const offset = parseInt(req.query.offset, 10) || 0;
  MainCourse.find()
    .skip(offset)
    .limit(limit)
    .sort({ created_at: 1 })
    .then((mainCourse) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Main courses fetched successfully',
        mainCourses: mainCourse,
      });
    });
});

// Post one main course
router.post('/', (req, res) => {
  if (utils.requestIsEmpty(req.body))
    // Check if request body is empty
    res
      .status(400)
      .json({ message: 'Cannot create main course, empty request.' });
  // If enmpty status 400 and send message
  else {
    // Create a main course with body request
    const mainCourse = new MainCourse({
      name: req.body.name,
      description: req.body.description,
      df_price: req.body.df_price,
      vat: req.body.vat,
      quantity: req.body.quantity,
      allergen: req.body.allergen,
      photo: req.body.photo,
      baking: req.body.baking,
    });

    mainCourse
      .save() // Save main course
      .then(() => {
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New main course created with success.',
          mainCourse,
        });
      })
      .catch((err) => {
        // If ko status 500 and send message
        res.status(500).json({ message: err.message });
      });
  }
});

// Delete a main course
router.delete('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res
      .status(400)
      .json({ message: 'Cannot delete main course, empty request.' });
  else {
    MainCourse.findOne({
      // Find one main course by id
      _id: req.params.id,
    }).then((mainCourse) => {
      MainCourse.deleteOne({
        // Delete one main course
        _id: req.params.id,
      }).then(() => {
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Main course deleted',
          mainCourse,
        });
      });
    });
  }
});

// Get one main course
router.get('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot get main course, empty request.' });
  else {
    MainCourse.findOne({
      // Find one main course by id
      _id: req.params.id,
    }).then((mainCourse) => {
      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Main course fetched successfully',
        mainCourse,
      });
    });
  }
});

// Update one main course
router.put('/:id', (req, res) => {
  if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id))
    // Check if id is empty, status 400 and message
    res.status(400).json({ message: 'Cannot put main course, empty request.' });
  else {
    MainCourse.findOne({
      // Find one main course by id
      _id: req.params.id,
    }).then((mainCourse) => {
      // Save data
      mainCourse.set({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
        baking: req.body.baking,
      });

      mainCourse
        .save()
        .then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Main course updated with success.',
            mainCourse,
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
