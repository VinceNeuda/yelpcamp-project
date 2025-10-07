//DEPENDENCIES
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const appError = require('./utils/appError');
const wrapAsync = require('./utils/wrapAsync');

const { campgroundSchema, reviewSchema } = require('./joischemas')

const campModel = require('./models/campground');
const reviewModel = require('./models/review');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/YelpCampDB')    //connects to local DB (or creates if it does not already exists)
    .then(() => console.log('MongoDB connected'))           //successful connection
    .catch(err => console.error('Connection error:', err)); //failed connection

//MIDDLEWARE
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views')); //tells Express where to find 'views' folder containing templates
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); //parse incoming data sent by <form> submissions
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new appError(msg, 400)
    } else {
        next();
    }
}

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
app.get('/', (req, res) => {
    res.render('homepage');
})

app.get('/campgrounds', wrapAsync(async (req, res) => {
    const campgrounds = await campModel.find({});
    res.render('campgrounds/index', { campgrounds });
}))

app.get('/campgrounds/new', wrapAsync(async (req, res) => {
    res.render('campgrounds/new');
}))

app.post('/campgrounds', validateCampground, wrapAsync(async (req, res) => {
    const campground = new campModel(req.body.campground)
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
}))

app.get('/campgrounds/:id', wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id).populate('reviews');
    console.log(campground);
    res.render('campgrounds/show', { campground });
}))

app.get('/campgrounds/:id/edit', wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))

app.put('/campgrounds/:id', validateCampground, wrapAsync(async (req, res,) => {
    const campground = await campModel.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id', wrapAsync(async (req, res) => {
    await campModel.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds')
}))

app.post('/campgrounds/:id/reviews', validateReview, wrapAsync(async (req, res) => {
    const campground = await campModel.findById(req.params.id);
    const review = new reviewModel(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

//if all else fails
// app.all(/(.*)/, (req, res) => {
//     res.status(404).send("Error: Not Found")
// })

app.all(/(.*)/, (req, res, next) => {   //centralised error handler for unmatched requests
    next(new appError('Page Not Found', 404))
})

//centralised error handler
// app.use((err, req, res, next) => {
//     res.send('Error: Something went wrong!')
// })
app.use((err, req, res, next) => {
    // destructure from err object with default status and message if not found
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).render('errorpage', { err }); // optional
})

//app connectivity test
app.listen(3000, () => {
    console.log('App is listening on port 3000!');
})