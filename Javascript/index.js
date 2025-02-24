function formatCityTime(cityTime) {
    return {
      date: cityTime.format("MMMM Do YYYY"),
      time: `${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small>`,
    };
  }
  
  function updateTime() {
    const cityElements = document.querySelectorAll(".city");
    cityElements.forEach((cityElement) => {
      const timeZone = cityElement.dataset.timezone;
      const cityTime = moment().tz(timeZone);
      const { date, time } = formatCityTime(cityTime);
      cityElement.querySelector(".date").innerHTML = date;
      cityElement.querySelector(".time").innerHTML = time;
    });
  }
  
  function updateCity(event) {
    const cityTimeZone = event.target.value;
    if (!cityTimeZone) return; // Prevent adding empty city
  
    const cityName = cityTimeZone.replace("_", " ").split("/")[1];
    const cityTime = moment().tz(cityTimeZone);
    const { date, time } = formatCityTime(cityTime);
  
    const citiesElement = document.querySelector("#cities");
    const newCityDiv = document.createElement("div");
    newCityDiv.classList.add("city");
    newCityDiv.dataset.timezone = cityTimeZone; // Store timezone in data attribute
    newCityDiv.innerHTML = `
      <div>
        <h2>${cityName}</h2>
        <div class="date">${date}</div>
      </div>
      <div class="time">${time}</div>
    `;
    citiesElement.appendChild(newCityDiv);
  }
  
  updateTime();
  setInterval(updateTime, 1000);
  
  const citiesSelect = document.querySelector("#city");
  citiesSelect.addEventListener("change", updateCity);