var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserSchema = new mongoose.Schema({
  amount: String,
  created_on: { type: Date, default: Date.now },
  product_id: [{ type: Schema.Types.ObjectId, ref:'products' }],
}, {collection: 'rates'});
module.exports = mongoose.model('rates', UserSchema);