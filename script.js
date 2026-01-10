console.log("script loaded");

const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const iconEl = document.querySelector(".icon");

async function getData(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=f4de92560d09428b8c1102529261001&q=${cityName}&aqi=no`
  );

  if (!response.ok) {
    throw new Error("API error");
  }

  return await response.json();
}

btn.addEventListener("click", async () => {
  console.log("searched");

  try {
    const value = input.value.trim();
    if (!value) return;

    const result = await getData(value);
    console.log(result);

    cityEl.innerText = `${result.location.name}, ${result.location.country}`;
    tempEl.innerText = `${result.current.temp_c}°C`;
    humidityEl.innerText = `${result.current.humidity}%`;
    windEl.innerText = `${result.current.wind_kph} km/hr`;

    const condition = result.current.condition.text;

    if (condition.includes("Clear")) {
      iconEl.src = "images/clear.png";
    } else if (condition.includes("Cloud")) {
      iconEl.src = "images/clouds.png";
    } else if (condition.includes("Rain")) {
      iconEl.src = "images/rain.png";
    } else if (condition.includes("Mist")) {
      iconEl.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.error("Fetch failed:", error);
    alert("City not found or network error");
  }
});
