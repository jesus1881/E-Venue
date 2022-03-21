function getMaps(zoom, latitude, longitude){

   // var cityQuery = `&center=${,}`;
    // console.log("getMaps arguments", arguments);
//Zoom should default at 19
if (zoom >= 20){
    zoom = 19
}
// Map API using template literals to configure the query parameters
    var apiUrl = `https://api.tomtom.com/map/1/staticimage?key=${config.maps.TEMP_KEY}&zoom=${zoom}&center=${longitude},${latitude}&format=jpg&layer=basic&style=main&width=800&height=600&view=Unified&language=en-US`
    return apiUrl;
    
}

//getMaps();