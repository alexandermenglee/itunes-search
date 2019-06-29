// variable declaration
let endpoint = "";
let img = document.getElementById('img');
let userSearch = document.getElementById('user-search');
let searchBtn = document.getElementById('search');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let results = document.getElementById('results');
let HTMLString;
let showMoreBtn = document.getElementById('show-more');

// adds event listener to search button
searchBtn.addEventListener('click', getData);
// adds event listener to the document
document.addEventListener("keypress", event => {
  if (event.keyCode === 13 || event.which === 13) {
    getData();
  }
});
results.addEventListener('click', getData);

// fetches data from iTunes API
function getData() {
  endpoint = "http://itunes.apple.com/search?term=" + userSearch.value.replace(" ", "+");
  // checks if there are child divs to result, and removes them before fetching and displaying new resultss
  if(results.childElementCount > 0) {
    $("#results").empty();
    getData();
  }
  $.ajax({
    // changees JSON to JSONP to avoid cross domain issues
    // Documentation: https://www.w3schools.com/js/js_json_jsonp.asp
    dataType: "jsonp",
    method: "GET",
    url: endpoint
  })
  .done(function (data) {
    console.log(data);
    displayData(data);
  })
  .fail(function (err) {
     alert(err);
   });
}

function displayData(data) {
  // display first 10 results
  // add a 'show more' button
  // show more button will call a function that shows the next 10

  getResults(data.results, results.childElementCount);
  showMoreBtn.addEventListener('click', () => {
    console.log(data);
    getResults(data.results, results.childElementCount);
  });
}


function getResults(songs, startingIndex) {
  let endingIndex = startingIndex + 10;
  console.log(endingIndex);

  if(endingIndex < songs.length - 9) {
    for (let i = startingIndex; i < endingIndex; i++) {
      HTMLString = `<div class='add-border'><h4 id='track-name'>Title: %</h4><p id='artis't>Artist: %%</p><img src='%%%'><p><a href='%%%%' target="_blank">Click For Sample</a></div>`;
      HTMLString = HTMLString.replace('%', songs[i].trackName);
      HTMLString = HTMLString.replace('%%', songs[i].artistName);
      HTMLString = HTMLString.replace('%%%', songs[i].artworkUrl100);
      HTMLString = HTMLString.replace('%%%%', songs[i].trackViewUrl);
      results.innerHTML += HTMLString
    }
  } else {
    for (let i = startingIndex; i < songs.length; i++) {
      HTMLString = `<div class='add-border'><h4 id='track-name'>Title: %</h4><p id='artis't>Artist: %%</p><img src='%%%'><p><a href='%%%%' target="_blank">Click For Sample</a><p>$</p></div>`;
      HTMLString = HTMLString.replace('%', songs[i].trackName);
      HTMLString = HTMLString.replace('%%', songs[i].artistName);
      HTMLString = HTMLString.replace('%%%', songs[i].artworkUrl100);
      HTMLString = HTMLString.replace('%%%%', songs[i].trackViewUrl);
      HTMLString = HTMLString.replace('$', songs[i].trackId);
      results.innerHTML += HTMLString
    }
  }

  

  return HTMLString;
}