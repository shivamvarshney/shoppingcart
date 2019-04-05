var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserSchema = new mongoose.Schema({
  name: String,
  description: String,
  amount: String,
  created_on: { type: Date, default: Date.now },
  category: [{ type: Schema.Types.ObjectId, ref:'categories' }],
  created_by: [{ type: Schema.Types.ObjectId, ref:'users' }],
  active: {
	type: Boolean,
	enum: [0, 1],
	default:1
  },
  productImage:String,
  is_delete:{
    type:Boolean,
    default:0
  }
}, {collection: 'products'});
module.exports = mongoose.model('products', UserSchema);