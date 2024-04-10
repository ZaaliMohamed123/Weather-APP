//Weather app

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ee3d032c3ac1ea22289d0913dd69ac04";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city = cityInput.value ;
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please Enter a city");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response =await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

async function displayWeatherInfo(data){
    const {name : city ,main:{temp,humidity},weather:[{description,icon}]} = data ;
    card.textContent="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");

    let tempCelsius = `${(temp  - 273.15).toFixed(1)}°C`
    tempCelsius = tempCelsius[0]+tempCelsius[1]+tempCelsius[2]+tempCelsius[3]+tempCelsius[5]+tempCelsius[6];

    cityDisplay.textContent = city;
    tempDisplay.textContent = tempCelsius;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description ;
    weatherEmoji.src = await getWeatherEmoji(icon);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(icon){
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

function displayError(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorDisplay");

    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errorMessage);
}
