const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');
const winston = require('winston');

const MongoHandler = require('./handler/mongoHandler');
const errorHandler = require('./handler/errorHandler');

const groupRouter = require('./router/groupRouter');
const memberRouter = require('./router/memberRouter');
const bgleRouter = require('./router/bgleRouter');
const friendRouter = require('./router/friendRouter');

const app = express();
process.env.NODE_ENV = 'dev';

try {
    if (process.env.NODE_ENV === 'dev') {
        winston.level = 'debug';
        MongoHandler.connectTestMongoDB();
        winston.debug('Success : Test MongoDB Connection');
    } else if (process.env.NODE_ENV === 'product') {
        MongoHandler.connectMongoDB();
        winston.info('Success : MongoDB Connection');
    }
} catch (err) {
    winston.debug('Error : MongoDB Connection');
    process.exit(1);
}
app.use(morgan('dev'));
app.use(cors());
app.use(multer({dest: 'B-gle/temp'}).array('image'));

app.use(memberRouter);
app.use(bgleRouter);
app.use(groupRouter);
app.use(friendRouter);
app.use(errorHandler);

module.exports = app;

