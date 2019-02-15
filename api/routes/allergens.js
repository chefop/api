// Call all require
const express = require('express');

const router = express.Router();

const allergen = require('../controllers/allergenController');

router.get('/', allergen.getAllAllergens);
router.get('/:id', allergen.getOneAllergen);
router.post('/', allergen.postOneAllergen);
router.delete('/:id', allergen.deleteOneAllergen);
router.put('/:id', allergen.putOneAllergen);

module.exports = router;
