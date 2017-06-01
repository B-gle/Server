const express = require('express');
const multer = require('multer');
const MongoHandler = require('./handler/mongoHandler');

const memberRouter = require('./router/memberRouter');
const bgleRouter = require('./router/bgleRouter');


const app = express();


MongoHandler.connectMongoDB();

app.use(multer({dest: 'B-gle/temp'}).array('image'));

app.use(memberRouter);
app.use(bgleRouter);


module.exports = app;

