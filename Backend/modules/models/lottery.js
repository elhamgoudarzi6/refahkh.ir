const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LotterySchema = new Schema({
    lock: { type: Boolean,default:false},
});
module.exports = mongoose.model('Lottery', LotterySchema);
