// Call all require
const express = require('express');

const router = express.Router();

const table = require('../controllers/tableController');

router.get('/', table.getAllTables);
router.get('/:id', table.getOneTable);
router.post('/', table.postOneTable);
router.delete('/:id', table.deleteOneStarter);
router.put('/:id', table.putOneTable);

module.exports = router;
