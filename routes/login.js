var express = require('express');
var router = express.Router();
var firebase = require('../connections/firebase_connect');
var fireAuth = firebase.auth();
var firebaseDB = require('../connections/firebase_admin_connect')

router.get('/', (req, res) => {
    res.render('login', { title: '登入', Error: req.flash('err') });
})

router.post('/', (req, res) => {
    let loginEmail = req.body.email;
    let loginPassword = req.body.passwd;
    fireAuth.signInWithEmailAndPassword(loginEmail, loginPassword)
        .then((user) => {
            console.log(user);
            // Define uid 
            req.session.uid = user.uid;        
            res.redirect('/');
        })
        .catch((err) => {
            let loginErr = err.message;
            req.flash('err', loginErr);
            res.redirect('login')
        })


})
module.exports = router;