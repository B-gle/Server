const mongoose = require('mongoose');

const mongoConfig = require('../config/mongoConfig');

mongoose.Promise = global.Promise;


class dbHandler {
    static connectMongoDB() {
        // Todo : Handle MongoDB Connection Error
        mongoose.connect(mongoConfig.url);
    }
}
module.exports = dbHandler;