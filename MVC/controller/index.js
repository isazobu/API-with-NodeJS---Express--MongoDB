const passport = require('passport');
const mongoose = require('mongoose');
User = require('../models/User')

getHeroesIndex = function (req, res) {
    res.render('home');
}


getLogin = function (req, res) {
    res.render('login')
}
postLogin = function (req, res) {
    console.log(req.body.email)
    console.log(req.body.password)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json({ message: 'HATA', err: err });
        if (user) {
            res.status(201).json({ message: "Logged In" });
            
        } else {
            console.log(req.body.email)
            console.log(req.body.password)
            res.status(401).json(info);
        }
    })(req, res);

}


getRegister = function (req, res) {
    res.render('register')
}

postRegister = function ({ body }, res) {
    if (!Object.values(body).every((val) => val)) {
        return res.send({ message: "All fields are required" });
    }
    if (body.password !== body.confirm_password) {
        return res.send({ message: "Passwords don't match." });
    }

    const user = new User();
    user.name = body.name.trim()
    user.email = body.email.trim()
    user.password = body.password.trim()
    user.setPassword(body.password);

    user.save((err, newUser) => {
        if (err) { return res.status(400).json({ message: 'Bu mail kullanılıyor', error: err }); }
        else {

            res.status(201).json({ message: "Created User", user: newUser })

        }
    });

}
module.exports = {
    getHeroesIndex,
    getLogin,
    postLogin,
    getRegister,
    postRegister
}