const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { addMessage } = require('.functions/addMessage.js');



exports.addMessage = addMessage;