const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const userModel = require('../models/user');

router.get('/register', (req, res) => {
    res.render('user/register');
})

module.exports = router;