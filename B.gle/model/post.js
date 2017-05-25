const mongoose = require('mongoose');
const config = require('../config/mongoConfig');
mongoose.Promise = global.Promise;

mongoose.connect(config.url, function(err) {
    if (err){
        console.log('connect error');
        return;
    }
    console.log('connect success');
});