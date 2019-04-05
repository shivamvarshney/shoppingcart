var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var UserSchema = new mongoose.Schema({
  user_fname: String,
  user_lname: String,
  user_phone: String,
  user_password: String,
  user_email: String,
  created_on: { type: Date, default: Date.now },
  user_role: [{ type: Schema.Types.ObjectId, ref:'roles' }],
}, {collection: 'users'});
module.exports = mongoose.model('users', UserSchema);