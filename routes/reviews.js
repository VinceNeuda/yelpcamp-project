//DEPENDENCIES
const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const reviewsCtr = require('../controllers/reviews');

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

//ROUTES
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewsCtr.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewsCtr.deleteReview))

module.exports = router;