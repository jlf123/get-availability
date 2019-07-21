const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    express = require('express');
const app = express();

//app.get('/availability', (request, response) => {
//  response.send(`${Date.now()} av`)
//});

exports.app = functions.https.onRequest((request, response) => {
    response.send(`${Date.now()}`)
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });