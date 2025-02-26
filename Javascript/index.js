// Function to update time for the selected city
function updateTime(cityTimeZone, cityName) {
    let citiesElement = document.querySelector("#cities");
    let cityTime = moment().tz(cityTimeZone);

    citiesElement.innerHTML = `
        <div class="city">
            <div>
                <h2>${cityName}</h2>
                <p class="timezone">Timezone: ${cityTimeZone}</p>
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
        </div>`;
}

// Function to detect city using IP and update time
async function detectLocation() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();

        let cityName = data.city;
        let timezone = moment.tz.guess();
        let cityTime = moment().tz(timezone);

        let citiesElement = document.querySelector("#cities");

        citiesElement.innerHTML = 
            <div class="city">
                <div>
                    <h2> ${cityName}</h2>
                 <p style="font-size: 14px; color: gray;">Timezone: ${timezone}</p>
                  <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                </div>
                <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
            </div>;
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("Could not detect your exact location. Using default timezone.");
        updateTime();
    }
}
// Function to update the city when the user selects one
function updateCity(event) {
    let cityTimeZone = event.target.value;

    if (cityTimeZone === "current") {
        detectLocation(); // Detect exact location
        return;
    }

    let cityName = cityTimeZone.includes("/")
        ? cityTimeZone.split("/")[1].replace("_", " ")
        : cityTimeZone;

    updateTime(cityTimeZone, cityName); // Update selected city
}

// Initial setup
window.onload = function() {
    // Set default city (Cape Town) on page load
    updateTime("Africa/Cape_Town", "Cape Town"); // Set Cape Town as default
    

    // Start updating the time every second
    setInterval(() => {
        let selectedCity = document.querySelector("#city").value || "Africa/Cape_Town";
        let cityName = selectedCity.includes("/") ? selectedCity.split("/")[1].replace("_", " ") : selectedCity;
        updateTime(selectedCity, cityName);
    }, 1000);
};

// Add event listener for city selection
let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
