require('./common/config/env.config.js');
require('./common/config/db.config.js');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
const api = require('./api');
// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', api.router);
// Start the server
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
