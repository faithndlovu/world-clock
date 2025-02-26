function updateTime(){
    let capeTownElement = document.querySelector("#cape-town");
    if (capeTownElement) {
        let capeTownDateElement = capeTownElement.querySelector(".date");
        let capeTownTimeElement = capeTownElement.querySelector(".time");
        let capeTownTime = moment().tz("Africa/Cape_Town");

        capeTownDateElement.innerHTML = capeTownTime.format("MMMM Do YYYY");
        capeTownTimeElement.innerHTML = capeTownTime.format("h:mm:ss [<small>]A[</small>]");
    }
}

function updateCity(event) {
    let cityTimeZone = event.target.value;

    // Check if user selects "current location"
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess(); // Get user's guessed timezone
    }

    // Extract city name (handle cases where there's no "/")
    let cityName = cityTimeZone.includes("/")
        ? cityTimeZone.split("/")[1].replace("_", " ")
        : cityTimeZone;

    let cityTime = moment().tz(cityTimeZone);
    let citiesElement = document.querySelector("#cities");

    citiesElement.innerHTML = `
        <div class="city">
            <div>
                <h2>Current Location: ${cityName}</h2>
                <p style="font-size: 14px; color: gray;">(Timezone: ${cityTimeZone})</p>
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
        </div>`;
}

// Update every second
updateTime();
setInterval(updateTime, 1000);

// Add event listener for city selection
let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
