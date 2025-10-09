//DEPENDENCIES
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const campModel = require('../models/campground');

const { isLoggedIn, validateCampground } = require('../middleware');

//ROUTES
router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await campModel.find({});
    res.render('campgrounds/index', { campgrounds });
}))

router.get('/new', isLoggedIn, wrapAsync(async (req, res) => {
    res.render('campgrounds/new');
}))

router.post('/', isLoggedIn, validateCampground, wrapAsync(async (req, res) => {
    const campground = new campModel(req.body.campground)
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created campground!');
    res.redirect(`campgrounds/${campground._id}`);
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Campground does not exist')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}))

router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Campground does not exist')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', isLoggedIn, validateCampground, wrapAsync(async (req, res,) => {
    const campground = await campModel.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    await campModel.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}))

module.exports = router;