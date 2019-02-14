// Call all require
const express = require('express');

const router = express.Router();

const dessert = require('../controllers/dessertController');

router.get('/', dessert.getAllDesserts);
router.get('/:id', dessert.getOneDessert);
router.post('/', dessert.postOneDessert);
router.delete('/:id', dessert.deleteOneDessert);
router.put('/:id', dessert.putOneDessert);

module.exports = router;
