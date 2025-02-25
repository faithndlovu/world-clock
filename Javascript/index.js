function updateTime() {
    let capeTownElement = document.querySelector("#cape-town");
    if (capeTownElement) {
        let capeTownDateElement = capeTownElement.querySelector(".date");
        let capeTownTimeElement = capeTownElement.querySelector(".time");
        let capeTownTime = moment().tz("Africa/Johannesburg"); // Corrected timezone

        capeTownDateElement.innerHTML = capeTownTime.format("MMMM Do YYYY");
        capeTownTimeElement.innerHTML = capeTownTime.format("h:mm:ss A");
    }
}

let intervalId; // To store the interval and prevent multiple timers

function updateCity(event) {
    let cityTimeZone = event.target.value;

    // Handle "My current location" selection
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess() || "UTC"; // Default to UTC if undefined
    }

    // Extract city name safely
    let cityName = cityTimeZone.includes("/") ? cityTimeZone.split("/")[1].replace("_", " ") : cityTimeZone;

    let citiesElement = document.querySelector("#cities");

    function updateSelectedCity() {
        let cityTime = moment().tz(cityTimeZone);
        citiesElement.innerHTML = `<div class="city">
            <div>
                <h2>${cityName}</h2>
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format("h:mm:ss A")}</div>
        </div>`;
    }

    // Update immediately
    updateSelectedCity();

    // Prevent multiple intervals from stacking up
    clearInterval(intervalId);
    intervalId = setInterval(updateSelectedCity, 1000);
}

// Start Cape Town clock on page load
updateTime();
setInterval(updateTime, 1000);

// Event listener for city selection
let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
