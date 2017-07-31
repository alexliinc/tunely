var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//models/album.js
var SongSchema = new Schema({
  name: String,
  trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;
