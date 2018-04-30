var firebase = require('firebase')
require('dotenv').config()

// Initialize Firebase
var config = {
  apiKey: process.env.apiKey,
  authDomain: "heroku-project.firebaseapp.com",
  databaseURL: "https://heroku-project.firebaseio.com",
  projectId: "heroku-project",
  storageBucket: "heroku-project.appspot.com",
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);

module.exports = firebase;

