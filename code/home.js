const apiKey = "41f73c39669785c98c058302f760af5a"; //change the api ..//
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById("firstInp");
const card = document.getElementById("div1");

// Handle form submission
weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    const city = cityInput.value.trim(); // Get the city input value
    if (city) {
        await getWeatherData(city); // Get weather data if city is entered
    }
});

// Fetch weather data from the API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // If response is successful, display the weather data
        if (response.ok) {
            displayWeatherInfo(data);
        } else {
            displayError("City not found. Please try again.");
        }
    } catch (error) {
        // Handle network or other errors
        displayError("An error occurred while fetching weather data.");
    }
}

// Display weather info on the page
function displayWeatherInfo(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const cityName = data.name;
    const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // Create a weather info card
    card.innerHTML = `
        <h2>${cityName}</h2>
        <img src="${icon}" alt="Weather icon">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
    `;
}

// Display error message
function displayError(error) {
    card.innerHTML = `<p>${error}</p>`;
}
