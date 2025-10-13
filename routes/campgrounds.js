//DEPENDENCIES
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const campgroundsCtr = require('../controllers/campgrounds');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

//ROUTES
router.route('/')
    .get(wrapAsync(campgroundsCtr.index))
    .post(isLoggedIn, validateCampground, wrapAsync(campgroundsCtr.createCamp))

router.get('/new', isLoggedIn, campgroundsCtr.renderNewForm) // Create

router.route('/:id')
    .get(wrapAsync(campgroundsCtr.showCamp)) // Read / Show
    .put(isLoggedIn, isAuthor, validateCampground, wrapAsync(campgroundsCtr.updateCamp))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgroundsCtr.deleteCamp)) // Delete

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgroundsCtr.renderEditForm)) // Update

module.exports = router;