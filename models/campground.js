
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    location: String,
    description: String,
    price: Number,
    image: String,
    reviews: [      //one-to-many reference to reviews
        {
            type: Schema.Types.ObjectId,
            ref: 'review'
        }
    ]
})

module.exports = mongoose.model('campground', campgroundSchema)
