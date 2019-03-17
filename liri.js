var axios = require("axios");
console.log("hello");
var artist = "sting";

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function (response) {
    console.log(response.data);
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