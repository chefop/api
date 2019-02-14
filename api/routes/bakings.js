// Call all require
const express = require('express');

const router = express.Router();

const baking = require('../controllers/bakingController');

router.get('/', baking.getAllBakings);
router.get('/:id', baking.getOneBaking);
router.post('/', baking.postOneBaking);
router.delete('/:id', baking.deleteOneBaking);
router.put('/:id', baking.putOneBaking);

module.exports = router;
