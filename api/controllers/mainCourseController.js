// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const MainCourse = require('../models/MainCourse');

module.exports = {
  // GET all main courses
  getAllMainCourses: async function getAllMainCourses(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const mainCourse = await MainCourse.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'Main courses fetched successfully',
        mainCourses: mainCourse,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one main course
  getOneMainCourse: async function getOneMainCourse(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot get main course, empty request.' });
      else {
        const mainCourse = await MainCourse.findOne({
          // Find one main course by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Main course fetched successfully',
          mainCourse,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one main course
  postOneMainCourse: async function postOneMainCourse(req, res) {
    try {
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

        await mainCourse.save(); // Save main course

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New main course created with success.',
          mainCourse,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one main course
  deleteOneMainCourse: async function deleteOneMainCourse(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete main course, empty request.' });
      else {
        const mainCourse = await MainCourse.findOne({
          // Find one main course by id
          _id: req.params.id,
        });
        await MainCourse.deleteOne({
          // Delete one main course
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Main course deleted',
          mainCourse,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one main course
  putOneMainCourse: async function putOneMainCourse(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot put main course, empty request.' });
      else {
        const mainCourse = await MainCourse.findOne({
          // Find one main course by id
          _id: req.params.id,
        });
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

        await mainCourse.save();

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Main course updated with success.',
          mainCourse,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },
};
