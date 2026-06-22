const express = require('express'); /* Importing the Express framework to create the server and handle routing */
const app = express(); /* Creating an instance of the Express application */
app.use(express.json()); /* Middleware to parse incoming JSON requests, allowing the server to handle JSON data sent in the request body */
module.exports = app; /* Exporting the Express application instance so that it can be imported and used in other files, such as the server.js file where the server is started */