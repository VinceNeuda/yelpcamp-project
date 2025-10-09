//DEPENDENCIES
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const appError = require('./utils/appError');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const userModel = require('./models/user');

//import route handlers
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

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
app.use(express.static(path.join(__dirname, 'public'))) //serving static files

const sessionConfig = {
    secret: 'secretCode',
    resave: false,
    saveUninitialized: true,
    cookie: {
        HttpOnly: true,
        expired: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); //refer to docs
passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser()) //how the user data is stored in the session
passport.deserializeUser(userModel.deserializeUser()); //turns the session data back into a full user object


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//ROUTES
app.get('/', (req, res) => {
    res.render('homepage');
})

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

//ERROR HANDLERS
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