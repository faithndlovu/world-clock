function updateTime(){
    let capeTownElement = document.querySelector("#cape-town");
    if (capeTownElement) {
    let capeTownDateElement = capeTownElement.querySelector(".date");
    let capeTownTimeElement = capeTownElement.querySelector(".time");
    let capeTownTime= moment().tz("Africa/Cape_Town");
    
    capeTownDateElement.innerHTML = capeTownTime.format("MMMM Do YYYY");
    capeTownTimeElement.innerHTML = capeTownTime.format("h:mm:ss [<small>]A[</small>]");
    }
}
/*
    let johannesburgElement=document.querySelector("#johannesburg");
    if (johannesburgElement) {
    let johannesburgDateElement=johannesburgElement.querySelector(".date");
    let johannesburgTimeElement=johannesburgElement.querySelector(".time");
    let johannesburgTime= moment().tz("Africa/Johannesburg");
    
    johannesburgDateElement.innerHTML=johannesburgTime.format("MMMM Do YYYY");
    johannesburgTimeElement.innerHTML=`${johannesburgTime.format("h:mm:ss")}<small>${capeTownTime.format("A")}</small>`;
    }
    */
    
    function updateCity(event) {
        let cityTimeZone = event.target.value;
        if (cityTimeZone === "current"){
            cityTimeZone = moment.tz.guess();
        }
        
        let cityName= cityTimeZone.split("/")[1].replace("_", " ");
        let cityTime = moment().tz(cityTimeZone);
        let citiesElement = document.querySelector("#cities");
        citiesElement.innerHTML = `<div class="city">
        <div>
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small>
    </div>
    </div>`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    
    let citiesSelect= document.querySelector("#city");
    citiesSelect.addEventListener("change", updateCity);

