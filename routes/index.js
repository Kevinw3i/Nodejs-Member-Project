var express = require('express');
var router = express.Router();
// Load Database
var firebaseDB = require('../connections/firebase_admin_connect')
var firebase = require('../connections/firebase_connect')

router.get('/', (req, res, next) => {
    /*
    console.log(firebase.auth());
    firebaseDB.ref().once('value' , (snapshot)=>{
        console.log(snapshot.val())
    })
    */
    let auth = req.session.uid;
    console.log(auth);
    if (auth !== undefined) {
        firebaseDB.ref('list').on('value', (snapshot) => {
            console.log(snapshot.val());
            res.render('index', {
                title: '留言板',
                auth: auth,
                Errors: req.flash('Errors'),
                list: snapshot.val()
            });
        })
    }
    else{
        res.render('index', {
            title: '留言板',
            auth: auth,
            Errors: req.flash('Errors'),
            list: ''
        });
    }
});
/* GET home page. */
module.exports = router;