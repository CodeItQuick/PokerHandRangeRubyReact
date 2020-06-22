// app.js
// A simple Node.JS app launcher for running with Passenger.
const react_app = require("./index.html");
module.exports = { create: react_app.create };
