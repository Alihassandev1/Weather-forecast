const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const location = document.getElementById("locationInput").value.trim();
  if (!location) {
    showError("Please enter a city name.");
    return;
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Location not found. Please try again.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
});

function displayWeather(data) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  const errorMessage = document.getElementById("errorMessage");

  // Update weather details
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("weatherDescription").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Show weather display and hide error message
  weatherDisplay.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function showError(message) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  const errorMessage = document.getElementById("errorMessage");

  // Show error message and hide weather display
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  weatherDisplay.classList.add("hidden");
}
