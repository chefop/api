// Call all require
const express = require('express');

const router = express.Router();

const starter = require('../controllers/starterController');

router.get('/', starter.getAllStarters);
router.get('/:id', starter.getOneStarter);
router.post('/', starter.postOneStarter);
router.delete('/:id', starter.deleteOneStarter);
router.put('/:id', starter.putOneStarter);

module.exports = router;
