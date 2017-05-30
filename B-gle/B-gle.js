const express = require('express');
const memberRouter = require('./router/memberRouter');
const b_gleRouter = require('./router/postRouter');
const formidable = require('express-formidable');
const MongoHandler = require('./handler/mongoHandler');
const app = express();


MongoHandler.connectMongoDB();

app.use(formidable({
    encoding: 'utf-8',
    uploadDir: 'B-gle/temp',
    multiples: true
}));
app.use(memberRouter);
app.use(b_gleRouter);



module.exports = app;

