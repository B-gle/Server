const express = require('express');
const memberRouter = require('./router/memberRouter');
const b_gleRouter = require('./router/b_gleRouter');
const formidable = require('express-formidable');

const app = express();

app.use(formidable({
    encoding: 'utf-8',
    uploadDir: 'B-gle/upload',
    multiples: true,
    keepExtensions: true,
    putSingleFilesInArray: true
}));
app.use(b_gleRouter);
app.use(memberRouter);


module.exports = app;

