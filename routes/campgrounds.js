//DEPENDENCIES
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const appError = require('../utils/appError');
const campModel = require('../models/campground');

const { campgroundSchema } = require('../joischemas')

//MIDDLEWARE
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new appError(msg, 400)
    } else {
        next();
    }
}

//ROUTES
router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await campModel.find({});
    res.render('campgrounds/index', { campgrounds });
}))

router.get('/new', wrapAsync(async (req, res) => {
    res.render('campgrounds/new');
}))

router.post('/', validateCampground, wrapAsync(async (req, res) => {
    const campground = new campModel(req.body.campground)
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground });
}))

router.get('/:id/edit', wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', validateCampground, wrapAsync(async (req, res,) => {
    const campground = await campModel.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', wrapAsync(async (req, res) => {
    await campModel.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}))

module.exports = router;