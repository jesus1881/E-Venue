function getEvents(infoParam) {
  var resultSize = 5;
  // var keywordQuery = `&keyword=${keyword}`;
  // var cityQuery = `&city=${city}`;

  console.log("getEvents arguments: ", arguments);

  var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=${resultSize}`;

  var acceptedKeys = ["keyword", "city", "stateCode", "countryCode", "startDateTime"];
  for(var key in infoParam){
    if(acceptedKeys.includes(key)){
      console.log("Accepted key: ", key)
      apiUrl = apiUrl + `&${key}=${infoParam[key]}`
    } else {
      console.log("Invalid key for events query.")
    }
  }
  apiUrl = apiUrl + `&apikey=${config.events.ticketMaster.TEMP_KEY}`

  console.log("apiUrl: ", apiUrl)

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("response: ", response);
        console.log("data: ", data);
        var objData = {};
        var events = data._embedded.events;
        // var events = config.events.infoExample;
        window.eventsInfo = events
        for(var i = 0; i < events.length; i++){
          console.log("events[i]: ", events[i])
          var eventVenueList = events[i]._embedded.venues;
          for (var j=0; j < eventVenueList.length; j++){
            var venueName = eventVenueList[j].name;
            var venueAddr1 = eventVenueList[j].address.line1;
            var venueAddr2 = eventVenueList[j].address.line2;
            var venueCity = eventVenueList[j].city.name;
            var venueState = eventVenueList[j].state.name;
            var venueUrl = eventVenueList[j].url;
            console.log("venueName: ", venueName);
            console.log("venueCity: ", venueCity)
            console.log("venueAddr1: ", venueAddr1);
            console.log("venueAddr2: ", venueAddr2)
            console.log("venueState: ", venueState)
            console.log("venueUrl: ", venueUrl)
          }
        }
        objData.data = events;
        infoStorage = objData
        saveToStorage()
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