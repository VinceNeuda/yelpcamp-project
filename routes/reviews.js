//DEPENDENCIES
const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const campModel = require('../models/campground');
const reviewModel = require('../models/review');

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

//ROUTES
router.post('/', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id);
    const review = new reviewModel(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added your review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await campModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await reviewModel.findByIdAndDelete(reviewId);
    req.flash('success', 'Review has been removed!');
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;