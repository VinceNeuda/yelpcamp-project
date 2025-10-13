const CampModel = require('../models/campground');
const ReviewModel = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await CampModel.findById(req.params.id);
    const newReview = new ReviewModel(req.body.review); //coming from the form submission
    newReview.author = req.user._id;
    campground.reviews.push(newReview); //child-to-parent association 
    await campground.save();
    await newReview.save();
    req.flash('success', 'Successfully created new review')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await CampModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //!!!!!!!!!!
    await ReviewModel.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}