const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast'
};

const searchInputBox = document.getElementById('input-box');
const dashboard = document.getElementById('weather-dashboard');
const emptyState = document.getElementById('empty-state');

searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        if (searchInputBox.value.trim() !== '') {
            getWeatherData(searchInputBox.value.trim());
        }
    }
});

function getWeatherData(city) {
    // Fetch Current Weather
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                if(res.status === 404) swal("Bad Input", "City not found", "warning");
                else if(res.status === 400) swal("Empty Input", "Please enter a valid city", "error");
                else swal("Error", "Something went wrong", "error");
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
        .then(data => {
            showCurrentWeather(data);
        })
        .catch(err => {
            console.error(err);
            searchInputBox.value = "";
        });
}

function showCurrentWeather(weather) {
    emptyState.classList.add('hide');
    dashboard.classList.remove('hide');

    document.getElementById('city-display').innerText = `${weather.name}, ${weather.sys.country}`;
    document.getElementById('temp-display').innerText = Math.round(weather.main.temp);
    document.getElementById('condition-display').innerText = weather.weather[0].description;
    
    // Some regions omit max/min accurately for current block, but we display what API provides
    document.getElementById('high-temp').innerText = Math.ceil(weather.main.temp_max);
    document.getElementById('low-temp').innerText = Math.floor(weather.main.temp_min);
    
    document.getElementById('last-updated').innerText = `Updated ${getTime(new Date())}`;

    const iconClass = getIconClass(weather.weather[0].main);
    document.getElementById('hero-icon').innerText = iconClass;
    
    searchInputBox.value = "";
}

function getIconClass(status) {
    switch(status) {
        case 'Rain': return 'rainy';
        case 'Clouds': return 'cloud_queue';
        case 'Clear': return 'wb_sunny';
        case 'Snow': return 'ac_unit';
        case 'Sunny': return 'wb_sunny';
        case 'Mist': case 'Haze': case 'Fog': return 'foggy';
        case 'Thunderstorm': case 'Drizzle': return 'thunderstorm';
        default: return 'partly_cloudy_day';
    }
}

function getTime(date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; 
    minute = minute < 10 ? '0'+minute : minute;
    return `${hour}:${minute} ${ampm}`;
}
