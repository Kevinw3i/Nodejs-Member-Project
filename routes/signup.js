var express = require('express');
var router = express.Router();
var firebase = require('../connections/firebase_connect');
var fireAuth = firebase.auth();
var firebaseDB = require('../connections/firebase_admin_connect')

router.get('/', (req, res) => {
    res.render('signup', {
        title: '註冊' ,
        Error : req.flash('error')
    });
})

router.post('/', (req, res) => {
    var email = req.body.email;
    var password = req.body.passwd;
    var nickname = req.body.nickname;

    fireAuth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            //console.log(user);
            var saveUser = {
                'email': email,
                'nickname': nickname,
                'uid': user.uid
            }
            firebaseDB.ref('/user/' + user.uid).set(saveUser);
            res.redirect('/signup/success')
        })
        .catch((err) => {
            let myError = err.Error;
            let myErrorMessage = err.message;

            req.flash('error', myErrorMessage)
            res.redirect('/signup')
        })
    //console.log('End');
})

router.get('/success', (req, res) => {
    res.render('success', {
        title: '註冊成功'
    });
})
module.exports = router;