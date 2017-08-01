var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js');


//models/album.js
var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String],
  songs: [Song.schema] //HAS TO BE LOWER CASE!!!!
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
