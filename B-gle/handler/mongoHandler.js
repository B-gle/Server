const mongoose = require('mongoose');

const mongoConfig = require('../config/mongoConfig');

mongoose.Promise = global.Promise;


class dbHandler {
    static connectMongoDB() {
        return mongoose.connect(mongoConfig.url);
    }
    static connectTestMongoDB(){
        return mongoose.connect(mongoConfig.testurl);
    }
}
module.exports = dbHandler;