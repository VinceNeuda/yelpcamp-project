//DEPENDENCIES
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path')
const mongoose = require('mongoose');

const campModel = require('./models/campground');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/YelpCampDB')   //connects to local DB (or creates if it does not already exists)
    .then(() => console.log('MongoDB connected'))           //successful connection
    .catch(err => console.error('Connection error:', err)); //failed connection

//MIDDLEWARE
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views')); //tells Express where to find 'views' folder containing templates
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
    res.render('homepage')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await campModel.find({})
    res.render('campgrounds/index', { campgrounds })
})

app.listen(3000, () => {
    console.log('App is listening on port 3000!')
})