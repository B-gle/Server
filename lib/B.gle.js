const express = require('express');
const memberRouter = require('./router/memberRouter');
const app = express();

app.use(memberRouter);

module.exports = app;

