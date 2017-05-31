const express = require('express');
const formidable = require('express-formidable');
const MongoHandler = require('./handler/mongoHandler');

const memberRouter = require('./router/memberRouter');
const bgleRouter = require('./router/bgleRouter');
const groupRouter = require('./router/groupRouter');

const app = express();


MongoHandler.connectMongoDB();

app.use(formidable({
    encoding: 'utf-8',
    uploadDir: 'B-gle/temp',
    multiples: true
}));
app.use(memberRouter);
app.use(bgleRouter);
app.use(groupRouter);



module.exports = app;

