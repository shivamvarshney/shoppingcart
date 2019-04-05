var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserkartSchema = new mongoose.Schema({
  role: String,
  active: {
	type: Boolean,
	enum: [0, 1],
	default:1
  }
}, {collection: 'roles'});
module.exports = mongoose.model('roles', UserkartSchema);