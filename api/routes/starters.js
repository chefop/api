const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const utils = require('../../config/utils');

const Starter = require('../models/Starter');
const ObjectId = require("mongoose").Types.ObjectId;

router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.count) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || false;
    const starters = Starter
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ created_at: 1 }).then(starters => {
            res.status(200).json({
                message: 'Starters fetched successfully',
                starters: starters
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
});

router.post('/', (req, res, next) => {
    if (utils.requestIsEmpty(req.body)) {
        res.status(400).json({ message: 'Cannot create starter, empty request.' });
    }
    const starter = new Starter({
        name: req.body.name,
        description: req.body.description,
        df_price: req.body.df_price,
        vat: req.body.vat,
        quantity: req.body.quantity,
        allergen: req.body.allergen,
        photo: req.body.photo,
    });

    starter
        .save()
        .then(result => {
            res.status(200).json({
                message: 'New starter created with success.',
                starter: starter
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
});

router.delete('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Cannot delete starter, empty request.' });
    }
    Starter.deleteOne({
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            success: true,
            message: 'Starter deleted'
        });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Cannot get starter, empty request.' });
    }
    const starter = Starter
        .findOne({
            _id: req.params.id
        })
        .then(starter => {
            res.status(200).json({
                message: 'Starter fetched successfully',
                starter: starter
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
});

router.put('/:id', (req, res, next) => {
    if (utils.requestIsEmpty(req.params.id) || !ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Cannot put starter, empty request.' });
    }
    const starter = Starter
        .findOne({
            _id: req.params.id
        })
        .then(starter => {
            starter.name = req.body.name;
            starter.description = req.body.description;
            starter.df_price = req.body.df_price;
            starter.vat = req.body.vat;
            starter.quantity = req.body.quantity;
            starter.allergen = req.body.allergen;
            starter.photo = req.body.photo;

            starter.save()
            .then(starter => {
                res.status(200).json({
                    message: 'Starter updated with success.',
                    starter: starter
                });
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;
