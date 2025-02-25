// Mapping of timezones to country names
const timezoneToCountry = {
    "Africa/Lusaka": "Zambia",
    "Africa/Blantyre": "Malawi",
    "Europe/London": "United Kingdom",
    "Africa/Johannesburg": "South Africa",
    "Africa/Harare": "Zimbabwe",
    "Africa/Lagos": "Nigeria",
    "Africa/Cairo": "Egypt",
    "Asia/Dubai": "United Arab Emirates",
    "America/New_York": "USA",
    "Asia/Tokyo": "Japan"
};

function updateTime() {
    let capeTownElement = document.querySelector("#cape-town");
    if (capeTownElement) {
        let capeTownDateElement = capeTownElement.querySelector(".date");
        let capeTownTimeElement = capeTownElement.querySelector(".time");
        let capeTownTime = moment().tz("Africa/Johannesburg"); // Correct timezone

        capeTownDateElement.innerHTML = capeTownTime.format("MMMM Do YYYY");
        capeTownTimeElement.innerHTML = capeTownTime.format("h:mm:ss") + 
            `<small> ${capeTownTime.format("A")}</small>`;
    }
}

let intervalId; // Store interval ID to prevent multiple timers

function updateCity(event) {
    let cityTimeZone = event.target.value;

    // Handle "My current location" selection
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess() || "UTC"; // Detect user's timezone or fallback to UTC
    }

    // Get country name from the mapping or set a default
    let countryName = timezoneToCountry[cityTimeZone] || "Unknown Location";

    // Extract city name safely from timezone
    let cityName = cityTimeZone.includes("/") 
        ? cityTimeZone.split("/")[1].replace("_", " ") 
        : cityTimeZone;

    let citiesElement = document.querySelector("#cities");

    function updateSelectedCity() {
        let cityTime = moment().tz(cityTimeZone);
        citiesElement.innerHTML = `<div class="city">
            <div>
                <h2>${cityName}, ${countryName}</h2> <!-- Display City and Country -->
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format("h:mm:ss")}<small> ${cityTime.format("A")}</small></div>
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

