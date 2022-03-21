function getEvents(infoParam) {
  var resultSize = 5;
  // var keywordQuery = `&keyword=${keyword}`;
  // var cityQuery = `&city=${city}`;

  // console.log("getEvents arguments: ", arguments);

  var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=${resultSize}`;

  var acceptedKeys = ["keyword", "city", "stateCode", "postalCode", "startDateTime"];
  for(var key in infoParam){
    if(acceptedKeys.includes(key) && infoParam[key] !== undefined){
      apiUrl = apiUrl + `&${key}=${infoParam[key]}`
    } else {
      console.log("Invalid key for events query.")
    }
  }
  // Utilize template literals for API key which is pulled from config.js form
  apiUrl = apiUrl + `&apikey=${config.events.ticketMaster.TEMP_KEY}`
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var events = data._embedded.events;
        // var events = config.events.infoExample;
        // window.eventsInfo = events
        for(var i = 0; i < events.length; i++){
          console.log("events[i]: ", events[i])
          var eventVenueList = events[i]._embedded.venues;
          for (var j=0; j < eventVenueList.length; j++){
            var longitude = eventVenueList[j].location.longitude;
            var latitude = eventVenueList[j].location.latitude;
            eventVenueList[j].location.imgUrl = getMaps("16", latitude, longitude);
          }
        }
        infoStorage.data = events;
        saveToStorage()
        displayInfo(infoStorage)
      });
    } else {
      console.log("API failed, incorrect response.")
      console.log("response: ", response);
    }
  });


}

// Example of passing info to function.
// var info = {
//   city:"San Francisco",
//   keyword: "Country"
// }

// getEvents(info);