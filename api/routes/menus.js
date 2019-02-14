// Call all require
const express = require('express');

const router = express.Router();

const menu = require('../controllers/menuController');

router.get('/', menu.getAllMenus);
router.get('/:id', menu.getOneMenu);
router.post('/', menu.postOneMenu);
router.delete('/:id', menu.deleteOneMenu);
router.put('/:id', menu.putOneMenu);

module.exports = router;
