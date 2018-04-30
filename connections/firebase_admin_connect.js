var admin = require("firebase-admin");

var serviceAccount = require("../heroku-project-firebase-adminsdk-es9dz-c1df61d03c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heroku-project.firebaseio.com"
});

var db = admin.database();

module.exports = db;