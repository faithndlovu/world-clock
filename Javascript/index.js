// Function to update time for the selected city
function updateTime(cityTimeZone, cityName) {
    let cityId = cityName.toLowerCase().replace(/\s+/g, "-");
    let cityTime = moment().tz(cityTimeZone);

    let cityElement = document.querySelector(`#${cityId}`);

    if (!cityElement) {
        let citiesElement = document.querySelector("#cities");
        let newCityDiv = document.createElement("div");
        newCityDiv.classList.add("city");
        newCityDiv.id = cityId;
        newCityDiv.innerHTML = `
            <div>
                <h2>${cityName}</h2>
                <p class="timezone">Timezone: ${cityTimeZone}</p>
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
        `;
        citiesElement.appendChild(newCityDiv);
    } else {
        cityElement.querySelector(".date").innerHTML = cityTime.format("MMMM Do YYYY");
        cityElement.querySelector(".time").innerHTML = `${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small>`;
    }
}

// Function to detect city using IP and update time
async function detectLocation() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();

        let cityName = data.city;
        let timezone = data.timezone; // Use actual timezone from API

        updateTime(timezone, cityName);
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("Could not detect your exact location. Using default Cape Town.");
        updateTime("Africa/Cape_Town", "Cape Town"); // Fallback to Cape Town
    }
}

// Function to update the city when the user selects one
function updateCity(event) {
    let cityTimeZone = event.target.value;

    if (cityTimeZone === "current") {
        detectLocation(); // Detect user's location
        return;
    }

    let cityName = cityTimeZone.includes("/")
        ? cityTimeZone.split("/")[1].replace("_", " ")
        : cityTimeZone;

    updateTime(cityTimeZone, cityName); // Update selected city
}

// Initial setup
window.onload = function() {
    // Set default cities (Cape Town & Gwanda) on page load
    updateTime("Africa/Cape_Town", "Cape Town");
    updateTime("Africa/Harare", "Gwanda"); // Gwanda shares timezone with Harare

    // Start updating time every second
    setInterval(() => {
        document.querySelectorAll(".city").forEach((cityElement) => {
            let cityName = cityElement.querySelector("h2").textContent;
            let timezone = cityElement.querySelector(".timezone").textContent.replace("Timezone: ", "");
            updateTime(timezone, cityName);
        });
    }, 1000);
};

// Add event listener for city selection
let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
