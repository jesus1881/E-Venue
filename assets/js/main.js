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
  // console.log("infoData: ", infoData)
  var wid;
  var imageSelected;
  var listEle = document.getElementsByClassName("event-list")[0];
  listEle.innerHTML = ""
//Venue Image rendering on an array.
for (let i = 0; i < infoData.data.length; i++) {
  imageSelected = false
  for (let j = 0; j < infoData.data[i].images.length; j++) {
    if (infoData.data[i].images[j].ratio === "4_3" && imageSelected==false){
      wid = j
      imageSelected = true 
      var priceEle = ""
      if("priceRanges" in infoData.data[i]){
        priceEle = `
          <p class="price">Min: $${infoData.data[i].priceRanges[0].min},
            max:$${infoData.data[i].priceRanges[0].max}</p>`
      }
      var dateEle = ""
      var timeEle = ""
      // Use if statement to ensure data is not showing undefined on Webpage
      if("dates" in infoData.data[i]){ 
        if("localTime" in infoData.data[i].dates.start){
          timeEle = `
          <p class="event-time">Time: ${infoData.data[i].dates.start.localTime}</p>`
        }
        dateEle= `
            <p class="event-date">Date: ${infoData.data[i].dates.start.localDate}</p>`
      }
      var infoEle = ""
      if("info" in infoData.data[i]){
        infoEle= `
        <p class="event-des">${infoData.data[i].info}</p>`
      }
      var imageEle = ""
      if("images" in infoData.data[i]){
        imageEle= `
        <img class="map-event-img mdc-card__content" src="${infoData.data[i].images[j].url}" alt="${infoData.data[i].name}">`
      }
      var nameEle = `
          <h4 class="event-name mdc-list-group__subheader"><a href="${infoData.data[i].url}">${infoData.data[i].name}</a></h4>`
      let cityInfoHTML = `
        <li class="mdc-layout-grid mdc-card"> 
          ${nameEle}
          <div class="mdc-layout-grid__inner">
            <div class="mdc-layout-grid__cell--span-3">  
              ${imageEle}
            </div>
            <div class="mdc-layout-grid__cell--span-6">
              ${dateEle}
              ${timeEle}
              ${priceEle}
              ${infoEle}
            </div>
            <div class="mdc-card__media--square mdc-layout-grid__cell--span-3">
              <img class="map-event-img mdc-card__content" src="${infoData.data[i]._embedded.venues[0].location.imgUrl}" alt="${infoData.data[i]._embedded.venues[0].address},${infoData.data[i]._embedded.venues[0].city.name}, ${infoData.data[i]._embedded.venues[0].country.countryCode}">
            </div>
          </div>
        </li>`
      //Append data to HTML
      listEle.insertAdjacentHTML('beforeend',cityInfoHTML)
    }
  }
}
}

//Adding event data to local storage to ensure that refreshing or closing tabs can still pull relevant information.
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


