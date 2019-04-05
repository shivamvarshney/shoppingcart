var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var productRattingSchema = new mongoose.Schema({
  user_kart_id: [{ type: Schema.Types.ObjectId, ref:'kart_history' }],
  rating: Number,
  feeback_comment :String,
  created_on: { type: Date, default: Date.now },  
}, {collection: 'product_ratting'});
module.exports = mongoose.model('product_ratting', productRattingSchema);