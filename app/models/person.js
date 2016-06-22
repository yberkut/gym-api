var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
  firstName: String
});

module.exports = mongoose.model('Person', PersonSchema);