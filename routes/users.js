const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { storeReturnTo } = require('../middleware');

const usersCtr = require('../controllers/users');

router.route('/register')
    .get(usersCtr.renderRegistrationForm)
    .post(wrapAsync(usersCtr.register));

router.route('/login')
    .get(usersCtr.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), usersCtr.login)

router.get('/logout', usersCtr.logout);

module.exports = router;