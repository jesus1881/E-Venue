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


// Returns back to main and uses local storage to store results from api.

//TODO: Render info storage from events.js
function displayInfo(infoData){
  console.log("infoData: ", infoData)


  var wid;
//Venue Image rendering for Image 1 to load on HTML
  for (let i = 0; i < infoData.data[0].images.length; i++) {
    if (infoData.data[0].images[i].width >= 600 && infoData.data[0].images[i].width <= 1000){
      wid = i
    } else wid = 0
    
  }

  document.getElementById("venue-image").setAttribute("src", infoData.data[0].images[wid].url);

  //Map Image rendering for Image 1 to load on HTML
  /*for (let i = 0; i < infoData.data[0].images.length; i++) {
    if (infoData.data[0].images[i].width >= 600 && infoData.data[0].images[i].width <= 1000){
      wid = i
    } else wid = 0
    
  }

  document.getElementById("map-image").setAttribute("src", infoData.data[0].images[wid].url);*/
//Venue Image rendering for Image 2 to load on HTML
  for (let i = 0; i < infoData.data[1].images.length; i++) {
    if (infoData.data[1].images[i].width >= 600 && infoData.data[1].images[i].width <= 1000){
      wid = i
    } else wid = 0
    
  }

  document.getElementById("venue-image2").setAttribute("src", infoData.data[1].images[wid].url);
  

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


