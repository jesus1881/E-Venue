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


function displayInfo(infoData){
  console.log("infoData: ", infoData)
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


