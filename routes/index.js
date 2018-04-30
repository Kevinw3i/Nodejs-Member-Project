var express = require('express');
var router = express.Router();
// Load Database
var firebaseDB = require('../connections/firebase_admin_connect')
var firebase = require('../connections/firebase_connect')

router.get('/', (req, res, next) => {
    let auth = req.session.uid;
    /*
    console.log(firebase.auth());
    firebaseDB.ref().once('value' , (snapshot)=>{
        console.log(snapshot.val())
    })
    */
    res.render('index', {
        title: '留言板',
        auth: auth
    });
});
/* GET home page. */
module.exports = router;