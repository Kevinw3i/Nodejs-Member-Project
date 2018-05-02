var express = require('express');
var router = express.Router();
var firebaseDB = require('../connections/firebase_admin_connect')

router.get('/', (req, res) => {
    // get user uid     
    firebaseDB.ref('user/' + req.session.uid).once('value', (snapshot) => {
        console.log(snapshot.val());       
        
        res.render('user', {
            title: '會員專區',
            nickname: snapshot.val().nickname
        })
    })

})
module.exports = router; 