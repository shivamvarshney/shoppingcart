var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var kartHistorySchema = new mongoose.Schema({
  user_id: [{ type: Schema.Types.ObjectId, ref:'users' }],
  product_id: [{ type: Schema.Types.ObjectId, ref:'products' }],
  no_of_product: Number,
  is_payment_done: { type: Boolean,enum: [0, 1],default:0 },
  updated_on: { type: Date, default: Date.now },
  created_on: { type: Date, default: Date.now },  
}, {collection: 'kart_history'});
module.exports = mongoose.model('kart_history', kartHistorySchema);