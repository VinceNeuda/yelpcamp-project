//DEPENDENCIES
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const campgroundsCtr = require('../controllers/campgrounds');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

//ROUTES
router.get('/', wrapAsync(campgroundsCtr.index))

router.get('/new', isLoggedIn, wrapAsync(campgroundsCtr.renderNewForm))

router.post('/', isLoggedIn, validateCampground, wrapAsync(campgroundsCtr.createCamp))

router.get('/:id', wrapAsync(campgroundsCtr.showCamp))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgroundsCtr.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(campgroundsCtr.updateCamp))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(campgroundsCtr.deleteCamp))

module.exports = router;