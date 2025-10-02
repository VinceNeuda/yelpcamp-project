
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    location: String,
    description: String,
    price: Number
})

module.exports = mongoose.model('campground', campgroundSchema)
