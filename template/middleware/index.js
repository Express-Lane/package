const express = require('express')
const router = express.Router();

//Middleware Imports
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

//Middleware Configuration
router.use(
    express.json(),
    helmet(),
    cors(),
    logger('dev')
)

module.exports = router;

