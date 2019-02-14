// Call all require
const express = require('express');

const router = express.Router();

const volume = require('../controllers/volumeController');

router.get('/', volume.getAllVolumes);
router.get('/:id', volume.getOneVolumes);
router.post('/', volume.postOneVolume);
router.delete('/:id', volume.deleteOneVolume);
router.put('/:id', volume.putOneVolume);

module.exports = router;
