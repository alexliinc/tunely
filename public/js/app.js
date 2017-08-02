/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//   artistName: 'Ladyhawke',
//   name: 'Ladyhawke',
//   releaseDate: '2008, November 18',
//   genres: ['new wave', 'indie rock', 'synth pop']
// });
// sampleAlbums.push({
//   artistName: 'The Knife',
//   name: 'Silent Shout',
//   releaseDate: '2006, February 17',
//   genres: ['synth pop', 'electronica', 'experimental']
// });
// sampleAlbums.push({
//   artistName: 'Juno Reactor',
//   name: 'Shango',
//   releaseDate: '2000, October 9',
//   genres: ['electronic', 'goa trance', 'tribal house']
// });
// sampleAlbums.push({
//   artistName: 'Philip Wesley',
//   name: 'Dark Night of the Soul',
//   releaseDate: '2008, September 12',
//   genres: ['piano']
// });
/* end of hard-coded data */



$(document).ready(function() {
  console.log('app.js loaded!');
  //console.log(sampleAlbums[0]);
  //renderAlbum(sampleAlbums[0]);

  // sampleAlbums.forEach(function(sampleAlbum) {
  //   renderAlbum(sampleAlbum)
  // });


  $.ajax({
    method: 'GET',
    url: '/api/albums',
    dataType: 'json',
    success: handleSuccess,
    error: handleError
  });

  $('form').on('submit', function(e) {
    e.preventDefault();

    let formData = $(this).serialize();
    console.log(formData);
    $(this).trigger("reset");

    $.ajax({
      method: 'POST',
      url: '/api/albums',
      dataType: 'json',
      data: formData,
      success: newAlbumSuccess,
      error: newAlbumError
    });
  });

  $('#albums').on('click', '.add-song', function(e) {
    //console.log('asdfasdfasdf');
    var currentAlbumId = $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('currentAlbumId: ', currentAlbumId);
    $('#songModal').data('album-id', currentAlbumId).modal();

  });

  $('#saveSong').on('click', handleNewSongSubmit);

  // call this when the button on the modal is clicked
  function handleNewSongSubmit(e) {
    e.preventDefault();
    //console.log("clicked");
    var currentAlbumId = $('#songModal').data('album-id');
    console.log(currentAlbumId);
    //$(this).trigger("reset");
    //api/albums/:album_id/songs
    console.log($('#songName').val());
    console.log(parseInt($('#trackNumber').val()));
    $.ajax({
      method: 'POST',
      url: '/api/albums/' + currentAlbumId + '/songs',
      dataType: 'json',
      data: {
        name: $('#songName').val(),
        trackNumber: parseInt($('#trackNumber').val())
      },
      success: newSongSuccess,
      error: newSongError
    });
    // get data from modal fields
    // POST to SERVER
    // clear form
    // close modal
    // update the correct album to show the new song
  }
});

// HELPER FUNCTIONS

function newAlbumSuccess(data) {
  console.log(data);
  renderAlbum(data);
  //$(this).trigger("reset");
}

function newAlbumError(err) {
  console.log('new album error!!');
  console.log(err)
}

function newSongSuccess(data) {
  console.log('NEW SONG SUCCESS ' + data._id);
  var removedOldAlbum = $('div').find("[data-album-id=" + data._id + "]");

  console.log(removedOldAlbum);
  removedOldAlbum.remove();

  renderAlbum(data);
  $('#songName').val("");
  $('#trackNumber').val("");
  $('#songModal').modal('hide');
}

function newSongError(err) {
  console.log('new song error!!');
  console.log(err)
  $('#songModal').trigger("reset");
}

function handleSuccess(data) {
  data.forEach(function(value) {
    renderAlbum(value);
  });
}

function handleError(data) {
  console.log('GET ALL album error!!');
}


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  //console.log('rendering album:', album);

  var albumHtml =
    "        <!-- one album -->" +
    "        <div class='row album' data-album-id='" + album._id + "'>" +
    "          <div class='col-md-10 col-md-offset-1'>" +
    "            <div class='panel panel-default'>" +
    "              <div class='panel-body'>" +
    "              <!-- begin album internal row -->" +
    "                <div class='row'>" +
    "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
    "                     <img src='" + "http://placehold.it/400x400'" + " alt='album image'>" +
    "                  </div>" +
    "                  <div class='col-md-9 col-xs-12'>" +
    "                    <ul class='list-group'>" +
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Album Name:</h4>" +
    "                        <span class='album-name'>" + album.name + "</span>" +
    "                      </li>" +
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Artist Name:</h4>" +
    "                        <span class='artist-name'>" + album.artistName + "</span>" +
    "                      </li>" +
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Released date:</h4>" +
    "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
    "                      </li>" +
    // buildSongsHtml
    buildSongsHtml(album.songs) +
    "                    </ul>" +
    "                  </div>" +
    "                </div>" +
    "                <!-- end of album internal row -->" +

    "              </div>" + // end of panel-body

    "              <div class='panel-footer'>" +
    "                <button class='btn btn-primary add-song'>Add Song</button>" +
    "              </div>" +

    "            </div>" +
    "          </div>" +
    "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);

}

function buildSongsHtml(songs) {
  var songText = "	– ";
  songs.forEach(function(song) {
    songText = songText + "(" + song.trackNumber + ") " + song.name + " – ";
  });
  var songsHtml = "<li class='list-group-item'>" + "<h4 class='inline-header'>Songs:</h4>" + "<span>" + songText + "</span>" + "</li>";
  return songsHtml;
}

// this function will be called when someone clicks a button to create a new song
//   it has to determine what album (in the DB) the song will go to
function handleNewSongButtonClick() {
  // get the current album's id from the row the button is in
  // set the album-id data attribute on the modal (jquery)
  // display the modal
}
