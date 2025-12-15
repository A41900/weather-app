const CACHE_KEY = "weatherAppCache";
const CACHE_DURATION = 30 * 60 * 1000;
let clockInterval = null;
let timezoneOffset = 0;

async function getWeather(city){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=fead2345e4f24447bb560740251512&q=${city}&lang=en`);
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

async function getCityImage(query) {
  const url = `https://api.unsplash.com/photos/random?` +
              `query=${encodeURIComponent(query)}` +
              `&orientation=landscape` +
              `&client_id=jT3ZfRjc1NYm9MMT7X_bwi8RxPgBe5INuEY4Z9jqIIQ`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function buildImageQuery(weatherData) {
  const city = weatherData.location.name;
  const country = weatherData.location.country;
  const desc = weatherData.current.condition.text;
  return `${city} ${country} skyline ${desc} weather`;
}

async function showWeather(city){
    try { 
        const cached = getCache();
        const cityCache = cached[city];
        if (cityCache && isCacheValid(cityCache)) {
            renderWeather(cityCache.weatherData);
            setBackgroundImg(cityCache.imgUrl);
            timezoneOffset = cityCache.timezoneOffset;
            console.log("Using cached data");
            return;
        }
        const weatherData = await getWeather(city);
        if (!weatherData) {
            throw new Error("Weather fetch failed");
        }

        renderWeather(weatherData);
        const query = buildImageQuery(weatherData);
        const imgData = await getCityImage(query);
        const imgUrl = imgData?.urls?.regular ?? null;
        setBackgroundImg(imgUrl);
        const cityLocalTime = weatherData.location.localtime;
        timezoneOffset = getTimezoneOffset(cityLocalTime);
        saveCache(city, weatherData, imgUrl, timezoneOffset);
        
    }catch(e){
        showError(e);
    }
}

function renderWeather(weatherData){
    const info = document.getElementById("weather-info");
    const location = document.getElementById("location");
    const weatherIcon = document.getElementById("weather-icon");
    const description = document.getElementById("weather-description");
    const temp = document.getElementById("main-temperature");
    const feels = document.getElementById("feels-like");
    const precipitation = document.getElementById("precipitation");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    location.textContent = weatherData.location.name ?? "N/A";
    weatherIcon.src = weatherData.current.condition.icon ?? "";
    description.textContent = weatherData.current.condition.text ?? "N/A";
    temp.textContent = weatherData.current.temp_c ?? "N/A";
    feels.textContent = weatherData.current.feelslike_c ?? "N/A"
    precipitation.textContent = weatherData.current.precip_mm?? "N/A";
    humidity.textContent = weatherData.current.humidity ?? "N/A";
    wind.textContent = weatherData.current.wind_kph ?? "N/A";
    info.classList.remove("hidden");
}

function getSelectedCity(){
    return document.getElementById("city-select").value;
}

// get weather btn !
document.getElementById("get-weather-btn").addEventListener("click", ()=> {
    const city = getSelectedCity();
    showWeather(city);
})

function setBackgroundImg(imgUrl){
    if (!imgUrl) return;
    document.body.style.setProperty("--bg-image",`url("${imgUrl}")`);
    document.body.classList.add("has-image");
}

function saveCache(city, weatherData, imgUrl, timezoneOffset) {
    const cache = getCache();
    cache[city] = {
        weatherData,
        imgUrl,
        timestamp: Date.now(),
        timezoneOffset
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function getCache() {
    const data = localStorage.getItem(CACHE_KEY);
    return data ? JSON.parse(data) : {};
}

function isCacheValid(cache) {
    return Date.now() - cache.timestamp < CACHE_DURATION;
}

function showError(error, message = "Something went wrong. Please try again later.") {
    alert(message);
    console.error(error);
}


function startGlobalClock() {

  const clockEl = document.getElementById("clock");

  function tick() {
    const now = new Date(Date.now() + timezoneOffset);

    clockEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  tick();
  clockInterval = setInterval(tick, 1000);
}

function getTimezoneOffset(cityLocalTime) {
  const cityDate = new Date(cityLocalTime.replace(" ", "T"));
  const now = new Date();
  return cityDate.getTime() - now.getTime();
}

function parseCityTime(localtime) {
  return new Date(localtime.replace(" ", "T"));
}

document.addEventListener("DOMContentLoaded", () => {
  startGlobalClock();
});
