// Function to update the time for a given city
function updateTime(cityTimeZone, cityName) {
    let cityElement = document.querySelector(`#${cityName.toLowerCase().replace(" ", "-")}`);
    if (cityElement) {
        let cityDateElement = cityElement.querySelector(".date");
        let cityTimeElement = cityElement.querySelector(".time");
        let cityTime = moment().tz(cityTimeZone);

        cityDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
        cityTimeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
}

// Function to detect the user's location and update time
async function detectLocation() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();

        let cityName = data.city;
        let timezone = data.timezone;
        let cityTime = moment().tz(timezone);

        let citiesElement = document.querySelector("#cities");

        citiesElement.innerHTML = `
            <div class="city">
                <div>
                    <h2>${cityName}</h2>
                    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                </div>
                <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
            </div>`;
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("Could not detect your location. Using default city.");
        updateTime("Africa/Cape_Town", "Cape Town"); // Fallback to Cape Town if location detection fails
    }
}

// Function to update the city time when the user selects a city from the dropdown
function updateCity(event) {
    let cityTimeZone = event.target.value;

    if (cityTimeZone === "current") {
        detectLocation(); // Detect user's location
        return;
    }

    let cityName = cityTimeZone.split("/")[1].replace("_", " "); // Get city name from timezone (e.g., "Africa/Johannesburg" becomes "Johannesburg")
    updateTime(cityTimeZone, cityName); // Update time for selected city
}

// Initial setup to show Cape Town and Gwanda by default
window.onload = function () {
    updateTime("Africa/Cape_Town", "Cape Town");
    updateTime("Africa/Harare", "Gwanda"); // Gwanda shares the same timezone as Harare

    // Start updating the time every second for all cities
    setInterval(() => {
        updateTime("Africa/Cape_Town", "Cape Town");
        updateTime("Africa/Harare", "Gwanda");
    }, 1000);
};

// Add event listener for city selection
let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
