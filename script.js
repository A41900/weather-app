async function getWeather(city){
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

async function showWeather(city){
    try { 
        const weatherData = await getWeather(city);
        if (!weatherData) {
            alert("Something went wrong, please try again later");
            return;
        }
    
        const info = document.getElementById("weather-info");
        const location = document.getElementById("location");
        const weatherIcon = document.getElementById("weather-icon");
        const main = document.getElementById("weather-main");
        //const description = document.getElementById("weather-description");
        //description.textContent = weatherData.weather[0].description;
        const temp = document.getElementById("main-temperature");
        const feels = document.getElementById("feels-like");
        const humidity = document.getElementById("humidity");
        const wind = document.getElementById("wind");
        const windGust = document.getElementById("wind-gust");

        location.textContent = weatherData.name ?? "N/A";
        weatherIcon.src = weatherData.weather?.[0]?.icon ?? "";
        main.textContent = weatherData.weather[0]?.main ??"";
        temp.textContent = weatherData.main?.temp ?? "N/A";
        feels.textContent = weatherData.main?.feels_like ?? "N/A";
        humidity.textContent = weatherData.main?.humidity ?? "N/A";
        wind.textContent = weatherData.wind?.speed ?? "N/A";
        windGust.textContent = weatherData.wind?.gust ?? "N/A";

        info.classList.remove("hidden");
        

    }catch(e){
        alert("Something went wrong, please try again later");
        console.log(e);
    }
}

function getSelectedCity(){
  return document.getElementById("city-select").value;
}

// get weather btn !
document.getElementById("get-weather-btn").addEventListener("click", ()=> {
    const city = getSelectedCity();
    showWeather(city);
})