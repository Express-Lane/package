// Imports
const express = require('express');
const middleware = require('../middleware');
const routes = require('../routes');

// Server Configuration
const server = express();

server.use( middleware );
server.use( '/api', routes );

// HOMEPAGE ROUTING
server.get("/", (req, res) => {
    res.json({ message: "Server Is Running..." });
  });

module.exports = server;