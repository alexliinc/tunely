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
});

// HELPER FUNCTIONS

function newAlbumSuccess(data) {
  console.log(data);
  renderAlbum(data);
  //$(this).trigger("reset");
}

function newAlbumError(err) {
  console.log('NEW album error!!');
  console.log(err)
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
    "        <div class='row album' data-album-id='" + "HARDCODED ALBUM ID" + "'>" +
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
    "                    </ul>" +
    "                  </div>" +
    "                </div>" +
    "                <!-- end of album internal row -->" +

    "              </div>" + // end of panel-body

    "              <div class='panel-footer'>" +
    "              </div>" +

    "            </div>" +
    "          </div>" +
    "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);

}
