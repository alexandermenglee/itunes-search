let endpoint = "";
let img = document.getElementById('img');
let userSearch = document.getElementById('user-search');
let searchBtn = document.getElementById('search');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let results = document.getElementById('results');
let HTMLString = `<p id='track-name'>Title: %</p><p id='artis't>Artist: %%</p><img src='%%%'>`;

searchBtn.addEventListener('click', getData);

function getData() {
  endpoint = "http://itunes.apple.com/search?term=" + userSearch.value.replace(" ", "+");
  // console.log(userSearch.value);
  // console.log(endpoint);
  if(results.childElementCount > 0) {
    $("#results").empty();
    getData();
  }
  $.ajax({
    dataType: "jsonp",
    method: "GET",
    url: endpoint

  })
  .done(function (data) {
     console.log(data);
     data.results.forEach((value, i) => {
       HTMLString = `<div class='add-border'><p id='track-name'>Title: %</p><p id='artis't>Artist: %%</p><img src='%%%'><p><a href='%%%%' target="_blank">Listen To A Sample</a></p></div>`;
       HTMLString = HTMLString.replace('%', value.trackName);
       HTMLString = HTMLString.replace('%%', value.artistName);
       HTMLString = HTMLString.replace('%%%', value.artworkUrl100);
       HTMLString = HTMLString.replace('%%%%', value.previewUrl);
       results.innerHTML += HTMLString;
     });
  })
  .fail(function (err) {
     console.log(err);
   });
}
// if results.childcount > 0 - clear dom then run getData
// else run getData