// Call all require
const express = require('express');

const router = express.Router();

const drink = require('../controllers/drinkController');

// Get all drinks
router.get('/', drink.getAllDrinks);
router.get('/:id', drink.getOneDrink);
router.post('/', drink.postOneDrink);
router.delete('/:id', drink.deleteOneDrink);
router.put('/:id', drink.putOneDrink);

module.exports = router;
