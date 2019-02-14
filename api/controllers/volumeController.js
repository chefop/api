// Require Mogoose
const { ObjectId } = require('mongoose').Types;
// Call utils
const utils = require('../../config/utils');
// Call model
const Volume = require('../models/Volume');

module.exports = {
  // GET all volumes
  getAllVolumes: async function getAllVolumes(req, res) {
    try {
      const limit = parseInt(req.query.count, 10) || 10; // Put a limit
      const offset = parseInt(req.query.offset, 10) || 0;
      const volumes = await Volume.find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 });

      res.status(200).json({
        // If ok status 200, send message and datas
        message: 'volumes fetched successfully',
        volumes,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // GET one volumes
  getOneVolumes: async function getOneVolumes(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot get volume, empty request.' });
      else {
        const volume = await Volume.findOne({
          // Find one volume by id
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'Volume fetched successfully',
          volume,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // POST one volume
  postOneVolume: async function postOneVolume(req, res) {
    try {
      if (utils.requestIsEmpty(req.body))
        // Check if request body is empty
        res
          .status(400)
          .json({ message: 'Cannot create volume, empty request.' });
      // If enmpty status 400 and send message
      else {
        // Create a volume with body request
        const volume = new Volume({
          name: req.body.name,
        });

        await volume.save(); // Save volume

        res.status(200).json({
          // If ok status 200, send message and datas
          message: 'New volume created with success.',
          volume,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // DELETE one volume
  deleteOneVolume: async function deleteOneVolume(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res
          .status(400)
          .json({ message: 'Cannot delete volume, empty request.' });
      else {
        const volume = await Volume.findOne({
          // Find one volume by id
          _id: req.params.id,
        });
        await Volume.deleteOne({
          // Delete one volume
          _id: req.params.id,
        });
        res.status(200).json({
          // If ok status 200 and send message
          message: 'Volume deleted',
          volume,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message, // If ok status 500, send message
      });
    }
  },

  // PUT one volume
  putOneVolume: async function putOneVolume(req, res) {
    try {
      if (
        utils.requestIsEmpty(req.params.id) ||
        !ObjectId.isValid(req.params.id)
      )
        // Check if id is empty, status 400 and message
        res.status(400).json({ message: 'Cannot put volume, empty request.' });
      else {
        const volume = await Volume.findOne({
          // Find one volume by id
          _id: req.params.id,
        });
        // Save data
        volume.set({
          name: req.body.name,
        });

        await volume.save().then(() => {
          res.status(200).json({
            // If ok status 200, send message and datas
            message: 'Volume updated with success.',
            volume,
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
