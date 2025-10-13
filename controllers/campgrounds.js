const campModel = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await campModel.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
    return res.render('campgrounds/new');
}

module.exports.createCamp = async (req, res, next) => {
    const campground = new campModel(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id; //association
    await campground.save();
    //console.log(campground);
    req.flash('success', 'Successfully created new campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCamp = async (req, res, next) => {
    const campground = await campModel.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground);
    if (!campground) {
        req.flash('error', 'Campground does not exist')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res, next) => {
    const campground = await campModel.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Campground does not exist')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCamp = async (req, res, next) => {
    const campground = await campModel.findByIdAndUpdate(req.params.id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCamp = async (req, res) => {
    await campModel.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}