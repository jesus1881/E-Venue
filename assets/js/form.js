function eventForm(){
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var startDateTime = document.getElementById("event-date").value;
  var ageAbove = "";
  var ageInput = document.getElementsByName("age-confirm");
//For loop to find the age input for the functionality of the button
  for (var i = 0; i < ageInput.length; i++) {
    if (ageInput[i].checked) {
      ageAbove = ageInput[i].value;
    }
  }
  var formObj = {
    keyword: "",
    city: city,
    stateCode: "",
    postalCode: zip,
    startDateTime: startDateTime,
    ageAbove: ageAbove
  }
  getEvents(formObj)
}
