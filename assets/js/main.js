var eventSubmit = document.getElementById("find-btn");
var infoStorage = getStorage("infoList");


// TODO: Add eventlistener to submit button
// Call for form function passing info.
// Form function cleans info.
// Form calls upon events info
eventSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  eventForm();
});

displayInfo(infoStorage)
// Returns back to main and uses local storage to store results from api.

//TODO: Render info storage from events.js
function displayInfo(infoData){
  console.log("infoData: ", infoData)
  var wid;
  var imageSelected;
  var listEli = document.getElementsByClassName("event-list")[0];
  listEli.innerHTML = ""
//Venue Image rendering for Image 1 to load on HTML
for (let i = 0; i < infoData.data.length; i++) {
  imageSelected = false
  for (let j = 0; j < infoData.data[i].images.length; j++) {
    if (infoData.data[i].images[j].ratio === "4_3" && imageSelected==false){
      wid = j
      imageSelected = true 
        let cityInfoHTML = `
        <li class="mdc-layout-grid mdc-card"> 
          <h4 class="event-name mdc-list-group__subheader" href="">${infoData.data[i].name}</h4>
          <div class="mdc-layout-grid__inner"> 
            <div class="mdc-layout-grid__cell--span-3">  
              <img class="map-event-img mdc-card__content" src="${infoData.data[i].images[j].url}" alt="${infoData.data[i].name}">
            </div>
            <div class="mdc-layout-grid__cell--span-6">
              <p class="event-date">Date: ${infoData.data[i].dates.start.localDate}</p>
              <p class="event-time">Time: ${infoData.data[i].dates.start.localTime}</p>
              <p class="price">Min: $${infoData.data[i].priceRanges[0].min},
              max:$${infoData.data[i].priceRanges[0].max}</p>
              <p class="event-des">${infoData.data[i].info}</p>
            </div>
            <div class="mdc-card__media--square mdc-layout-grid__cell--span-3">
              <img class="map-event-img mdc-card__content" src="${infoData.data[i]._embedded.venues[0].location.imgUrl}" alt="${infoData.data[i]._embedded.venues[0].address},${infoData.data[i]._embedded.venues[0].city.name}, ${infoData.data[i]._embedded.venues[0].country.countryCode}">
            </div>
          </div>
        </li>`
        listEli.insertAdjacentHTML('beforeend',cityInfoHTML)
    }
  }
}
  //Map Image rendering for Image 1 to load on HTML
  /*for (let i = 0; i < infoData.data[0].images.length; i++) {
    if (infoData.data[0].images[i].width >= 600 && infoData.data[0].images[i].width <= 1000){
      wid = i
    } else wid = 0
    
  }*/

/* document.getElementById("map-image").setAttribute("src", infoData.data[0].images[wid].url);*/
  
/*var imageSelected = false
//Venue Image rendering for Image 2 to load on HTML
  for (let i = 0; i < infoData.data.length; i++) {
    for (let j = 0; j < infoData.data[i].images.length; j++) {
      if (infoData.data[i].images[j].ratio === "4_3" &&imageSelected===false){
        wid = j
        imageSelected = true 
      }
    }
  }
  
  document.getElementById("venue-image2").setAttribute("src", infoData.data[i].images[wid].url);*/
  

}


function getStorage(storageItem) {
  var storageData = JSON.parse(localStorage.getItem(storageItem));
  if (storageData === null) {
    storageData = {};
  }

  return storageData;
}

function saveToStorage() {
  var currentInfoStorage = infoStorage;

  localStorage.setItem("infoList", JSON.stringify(currentInfoStorage));
}


