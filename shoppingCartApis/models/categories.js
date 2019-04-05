var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CategoriesSchema = new mongoose.Schema({
  name: String,
  created_on: { type: Date, default: Date.now },
  created_by: [{ type: Schema.Types.ObjectId, ref:'users' }],
  active: {
	type: Boolean,
	enum: [0, 1],
	default:1
  }
}, {collection: 'categories'});
module.exports = mongoose.model('categories', CategoriesSchema);