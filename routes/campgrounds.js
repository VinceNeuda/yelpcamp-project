//DEPENDENCIES
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const campgroundsCtr = require('../controllers/campgrounds');
const multer = require('multer');    // enables parsing of multi-part form info 
const upload = multer({ dest: 'uploads/' }); // where parsed info in sent


const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

//ROUTES
router.route('/')
    .get(wrapAsync(campgroundsCtr.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgroundsCtr.createCamp))

router.get('/new', isLoggedIn, campgroundsCtr.renderNewForm) // Create

router.route('/:id')
    .get(wrapAsync(campgroundsCtr.showCamp)) // Read / Show
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgroundsCtr.updateCamp))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgroundsCtr.deleteCamp)) // Delete

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgroundsCtr.renderEditForm)) // Update

module.exports = router;