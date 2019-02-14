// Call all require
const express = require('express');

const router = express.Router();

const mainCourse = require('../controllers/mainCourseController');

router.get('/', mainCourse.getAllMainCourses);
router.get('/:id', mainCourse.getOneMainCourse);
router.post('/', mainCourse.postOneMainCourse);
router.delete('/:id', mainCourse.deleteOneMainCourse);
router.put('/:id', mainCourse.putOneMainCourse);

module.exports = router;
