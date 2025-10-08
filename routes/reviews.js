//DEPENDENCIES
const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const appError = require('../utils/appError');
const campModel = require('../models/campground');
const reviewModel = require('../models/review');

const { reviewSchema } = require('../joischemas');

//MIDDLEWARE
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new appError(msg, 400)
    } else {
        next();
    }
}

//ROUTES
router.post('/', validateReview, wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id);
    const review = new reviewModel(req.body.review);
    console.log(review)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await campModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await reviewModel.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;