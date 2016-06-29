var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonRoleSchema   = new Schema({
  personId: Schema.Types.ObjectId,
  roleId: Schema.Types.ObjectId
});

module.exports = mongoose.model('PersonRole', PersonRoleSchema);