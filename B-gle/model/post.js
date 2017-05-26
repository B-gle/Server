// //const mongoose = require('mongoose');
//
// const mongoConfig = require('../config/mongoConfig');
//
// mongoose.Promise = global.Promise;
//
//
//
//
//
//
//
//
//
//
// mongoose.connect(mongoConfig.url, function(err) {
//     if (err){
//         console.log('connect error');
//         return;
//     }
//     console.log('connect success');
// });
//
// const B_gleSchema = new mongoose.Schema({
//     B_gle_Id : String,
//     B_gle_URL: String,
//     message : String,
//     modified : { type:Date, default:Date.now }
// });
//
// B_gleSchema.methods.saveImage = function(image) {
//     console.log('increase method in Schema', this);
//     this.value += num;
//     this.modified = new Date();
//     return this.save();
// }
//
//
//
//
// const B_gleSchema = mongoose.model('B-gle', B_gleSchema);
//
// function saveValue(name, value) {
//     const obj = new B_gleSchema();
//     obj.name = name;
//     obj.value = value;
//
//     obj.save().then( result => {
//         console.log('value save success');
//     }, err => {
//         console.log('value save fail :', err);
//     });
// }
//
// saveValue('아이유', 1);
//
// module.exports = s3;