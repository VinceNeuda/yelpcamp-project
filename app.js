//DEPENDENCIES
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path')

const app = express();

//MIDDLEWARE
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views')); //tells Express where to find 'views' folder containing templates
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
    res.render('homepage')
})

app.listen(3000, () => {
    console.log('App is listening on port 3000!')
})