const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { storeReturnTo } = require('../middleware');

const usersCtr = require('../controllers/users');

router.get('/register', usersCtr.renderRegistrationForm)

router.post('/register', wrapAsync(usersCtr.register))

router.get('/login', usersCtr.renderLoginForm)

router.post('/login', storeReturnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    usersCtr.login)

router.get('/logout', usersCtr.logout);

module.exports = router;