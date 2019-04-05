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
    enum: [false, true],
    default:true
  },
  productImage:String,
  is_delete:{
    type:Boolean,
    default:false
  }
}, {collection: 'products'});
module.exports = mongoose.model('products', UserSchema);