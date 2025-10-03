const mongoose = require('mongoose');
const campModel = require('../models/campground');
const cities = require('../seeds/cities');
const { descriptors, places } = require('../seeds/seedHelpers');


mongoose.connect('mongodb://127.0.0.1:27017/YelpCampDB')   //connects to local DB (or creates if it does not already exists)
    .then(() => console.log('MongoDB connected'))           //successful connection
    .catch(err => console.error('Connection error:', err)); //failed connection


// pick random element from an array input
const picker = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await campModel.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const campSeed = campModel({
            title: `${picker(descriptors)},${picker(places)}`,
            location: `${cities[random].city}, ${cities[random].state}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla fugit voluptas dolores ullam veritatis dicta nisi...",
            price,
        })
        await campSeed.save();
    }
}
seedDB();


seedDB().then(() => {
    mongoose.connection.close()
})
