var config = require("dotenv").config();
var axios = require("axios");
console.log("hello");
console.log(process.env);
console.log(process.argv);
var commandOption = (process.argv[2]);
var requestOption = (process.argv[3]);
if (commandOption==="concert-this"){
    getConcertInfo(requestOption);
} else {
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
