var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
  firstName: String,
  roles: [Schema.ObjectId]
});

module.exports = mongoose.model('Person', PersonSchema);