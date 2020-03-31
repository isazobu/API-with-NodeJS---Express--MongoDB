var express = require('express');
var passport = require('passport');
var router = express.Router();
/* GET home page. */
var auth = require('../models/auth');

var userCtrl = require('../controller/index');


router.get('/', userCtrl.getHeroesIndex);

router.get('/register', userCtrl.getRegister);
router.post('/register', userCtrl.postRegister)
router.get('/login', userCtrl.getLogin);
router.post('/login', userCtrl.postLogin);

router.get('/checkauth', auth, function (req, res) {

    res.status(200).json({
        status: 'Login successful!'
    });

});


module.exports = router;
