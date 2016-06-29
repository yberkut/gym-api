var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonRoleSchema   = new Schema({
  personId: Schema.Types.ObjectId,
  roleName: String
});

module.exports = mongoose.model('PersonRole', PersonRoleSchema);