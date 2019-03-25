var config = require("dotenv").config();
var axios = require("axios");
var imdbApi = require('imdb-api');
var Spotify = require('node-spotify-api');
var fs = require("fs");
//console.log("hello");
//console.log(process.env);
//console.log(process.argv);
var movieSelection = (process.argv)
var commandOption = (process.argv[2]);
var requestOption = (process.argv[3]);
if (commandOption === "movie-this"){
  //getMovieInfo(requestOption) 
  //console.log('everywhere',type(requestOption))
  if (typeof(requestOption) === 'undefined' || requestOption  === "") {
    getMovieInfo("Mr. Nobody")
  } else { 
    getMovieInfo(requestOption)
  }
} else if (commandOption==="concert-this"){
    getConcertInfo(requestOption);
} 
else if(commandOption === "spotify-this-song"){
  if (typeof(requestOption) === 'undefined' || requestOption === "") { 
      getSpotifyTrack("I saw the Sign")
  } else {
     getSpotifyTrack(requestOption)
  }
} else if (commandOption === "do-what-it-says"){
      console.log("do-what-it-says")
      var filename = "./random.txt"
      fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data)
        getSpotifyTrack(data)
      });
}
else {
    console.log("invalid");
}
function getConcertInfo(artist){ 
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function (response) {
    //console.log(response.data);
    console.log("data came backe");
    for (i=0; i<response.data.length; i++){
        console.log("city:" + response.data[i].venue.city);
        console.log("Venue:" + response.data[i].venue.name);
        console.log("Time:"+ response.data[i].datetime);
        //console.log('-------------------')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


/*function getMovieInfo(){ 
axios.get("http://www.imdb.com/title/tt0485947/")
  .then (function (response)) {
    console.log(response);
    
    getMovieInfo();


  }
*/
function getMovieInfo(requestOption){
  console.log(requestOption)
imdbApi.get({name: requestOption}, {apiKey: 'trilogy', timeout: 30000})
.then(function (response){
  console.log("title:" + response.title);
  console.log("year:" + response.year);
  console.log(response.ratings[0].Source + ":" + response.ratings[0].Value);
  console.log(response.ratings[1].Source + ":" + response.ratings[1].Value);
  console.log("country:" + response.country);
  console.log("language:" + response.languages);
  console.log("Plot:" + response.plot);
  console.log("actors:" + response.actors);

})
.catch(function (error) {
  console.log(error);
  console.log("Test")
});
}


 
function getSpotifyTrack(requestOption){
  var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: requestOption })
  .then(function(response) {
var firstTrack = response.tracks.items[0];
    //console.log(response);
    //console.log(response.tracks.items[0]);
    console.log(firstTrack.name);
    console.log(firstTrack.artists[0].name);
    console.log(firstTrack.external_urls);
    console.log(firstTrack.album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}