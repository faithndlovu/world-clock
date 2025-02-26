// Function to update the current time
function updateTime() {
    let defaultCityElement = document.querySelector("#default-city");

    if (defaultCityElement) {
        let dateElement = defaultCityElement.querySelector(".date");
        let timeElement = defaultCityElement.querySelector(".time");
        let timezoneElement = defaultCityElement.querySelector(".timezone");

        let localTimeZone = moment.tz.guess();
        let localTime = moment().tz(localTimeZone);

        timezoneElement.innerHTML = `Timezone: ${localTimeZone}`;
        dateElement.innerHTML = localTime.format("MMMM Do YYYY");
        timeElement.innerHTML = `${localTime.format("h:mm:ss")}<small>${localTime.format("A")}</small>`;
    }
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

        citiesElement.innerHTML = `
            <div class="city">
                <div>
                    <h2> ${cityName}</h2>
                 <p style="font-size: 14px; color: gray;">(Timezone: ${cityTimeZone})</p>
                  <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                </div>
                <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
            </div>`;
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("Could not detect your exact location. Using default timezone.");
        updateTime();
    }
}

// Function to update city when user selects one
function updateCity(event) {
    let cityTimeZone = event.target.value;

    if (cityTimeZone === "current") {
        detectLocation(); // Detect exact location
        return;
    }

    let cityName = cityTimeZone.includes("/")
        ? cityTimeZone.split("/")[1].replace("_", " ")
        : cityTimeZone;

    let cityTime = moment().tz(cityTimeZone);
    let citiesElement = document.querySelector("#cities");

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

// Initial setup
detectLocation();
setInterval(updateTime, 1000);

// Add event listener for city selection
let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
