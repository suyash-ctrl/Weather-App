console.log("script loaded");

const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".icon");

async function getData(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=f4de92560d09428b8c1102529261001&q=${cityName}&aqi=no`,
  );

  if (!response.ok) {
    throw new Error("API error");
  }

  return await response.json();
}

btn.addEventListener("click", async () => {
  try {
    const value = input.value.trim();
    if (!value) return;

    const result = await getData(value);
    console.log(result);

    city.innerText = `${result.location.name}, ${result.location.country}`;
    temp.innerText = `${result.current.temp_c}°C`;
    humidity.innerText = `${result.current.humidity}%`;
    wind.innerText = `${result.current.wind_kph} km/hr`;

    const condition = result.current.condition.text;

    if (condition.includes("Clear")) {
      icon.src = "images/clear.png";
    } else if (condition.includes("Cloud")) {
      icon.src = "images/clouds.png";
    } else if (condition.includes("Rain")) {
      icon.src = "images/rain.png";
    } else if (condition.includes("Mist")) {
      icon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    
    alert("City not found or network error");
  }
});
