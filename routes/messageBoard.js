var express = require('express');
var router = express.Router();
var firebaseDB = require('../connections/firebase_admin_connect')

router.post('/', function (req, res) {
    firebaseDB.ref('user/' + req.session.uid).once('value', (snapshot) => {
        req.checkBody("content", "內容不能空值").notEmpty();
        let Errors = req.validationErrors();
        if (Errors) {
            req.flash('Errors', Errors[0].msg);
            res.redirect('/')
        }
        else {
            let nickname = snapshot.val().nickname;

            let ref = firebaseDB.ref('list').push();
            let listContent = {
                nickname: nickname,
                content: req.body.content,
                time: Date.now()
            }

            ref.set(listContent).then(() => {
                res.redirect('/');
            })
        }
    })
})
module.exports = router;