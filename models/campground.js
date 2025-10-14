
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const campgroundSchema = new Schema({
    title: String,
    location: String,
    description: String,
    price: Number,
    images: [ImageSchema],
    reviews: [      //one-to-many reference to reviews
        {
            type: Schema.Types.ObjectId,
            ref: 'review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

// If camp is deleted trigger deletion of associated reviews
campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) { //if product array is not empty
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
})

module.exports = mongoose.model('campground', campgroundSchema)
