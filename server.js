// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var db = require('./models');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

/************
 * DATABASE *
 ************/


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [{
      method: "GET",
      path: "/api",
      description: "Describes available endpoints"
    }]
  });
});

app.get('/api/albums', function album_index(req, res) {
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});

app.post('/api/albums', function album_index(req, res) {
  db.Album.create({
    artistName: req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres
  }, function(err, album) {
    console.log(album);
    res.json(album);
  });
});

// GET /api/albums/:id
app.get('/api/albums/:id', function album_index(req, res) {
  db.Album.findOne({
    _id: req.params.id
  }, function(err, album) {
    console.log(album);
    res.json(album);
  });
  //res.send("yup");
});
// POST /api/albums/:id/songs
app.post('/api/albums/:id/songs', function album_index(req, res) {
  db.Album.findOne({
    _id: req.params.id
  }, function(err, album) {
    album.songs.push({
      name: req.body.name,
      trackNumber: req.body.trackNumber
    });
    console.log(req.params.id);
    album.save();
    res.json(album);
  });

  //res.send("yup");
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is running on http://localhost:3000/');
});
