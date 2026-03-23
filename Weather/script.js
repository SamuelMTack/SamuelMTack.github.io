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
            
            // Fetch 5-Day Forecast
            return fetch(`${weatherApi.forecastUrl}?q=${city}&appid=${weatherApi.key}&units=imperial`);
        })
        .then(res => res.json())
        .then(data => showForecast(data))
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
    
    // Details Grid
    document.getElementById('humidity-val').innerText = weather.main.humidity;
    document.getElementById('wind-val').innerText = Math.round(weather.wind.speed);
    document.getElementById('pressure-val').innerText = weather.main.pressure;
    document.getElementById('visibility-val').innerText = (weather.visibility / 1000).toFixed(1); 
    
    document.getElementById('last-updated').innerText = `Updated ${getTime(new Date())}`;

    const iconClass = getIconClass(weather.weather[0].main);
    document.getElementById('hero-icon').innerText = iconClass;
    
    searchInputBox.value = "";
}

function showForecast(forecastData) {
    const list = document.getElementById('forecast-list');
    list.innerHTML = ''; 
    
    // Group forecast elements by Date to calculate true Highs and Lows for the day
    const daysMap = new Map();
    forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // "YYYY-MM-DD"
        if (!daysMap.has(date)) {
            daysMap.set(date, []);
        }
        daysMap.get(date).push(item);
    });

    const daysList = Array.from(daysMap.values()).slice(1, 6); // Grab next 5 full days
    if(daysList.length === 0) return; 
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    daysList.forEach((dayItems, index) => {
        // Find peak temps for the day
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        dayItems.forEach(i => {
           if(i.main.temp_max > maxTemp) maxTemp = i.main.temp_max;
           if(i.main.temp_min < minTemp) minTemp = i.main.temp_min;
        });

        const middleItem = dayItems[Math.floor(dayItems.length / 2)];
        const dateObj = new Date(middleItem.dt * 1000);
        const dayName = days[dateObj.getDay()];
        
        const high = Math.ceil(maxTemp);
        const low = Math.floor(minTemp);
        const iconClass = getIconClass(middleItem.weather[0].main);
        
        const bgClass = index % 2 === 0 ? 'bg-surface-container-low' : 'bg-surface-container';
        const innerGradient = index % 2 === 0 ? 'left-1/4 right-1/4' : 'left-1/3 right-1/5';

        const row = document.createElement('div');
        row.className = `flex items-center justify-between p-4 md:p-6 rounded-2xl ${bgClass}`;
        row.innerHTML = `
            <span class="w-16 md:w-24 text-on-surface font-medium text-sm md:text-base">${dayName}</span>
            <div class="flex items-center gap-4 flex-1 justify-center">
                <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">${iconClass}</span>
                <div class="hidden sm:block w-32 h-1.5 bg-surface-container-highest rounded-full relative">
                    <div class="absolute ${innerGradient} h-full bg-gradient-to-r from-tertiary-dim to-tertiary rounded-full shadow-[0_0_8px_rgba(185,219,255,0.4)]"></div>
                </div>
            </div>
            <div class="w-16 md:w-24 text-right">
                <span class="text-on-surface font-bold text-base md:text-lg">${high}°</span>
                <span class="text-on-surface-variant text-xs md:text-sm ml-1 md:ml-2">${low}°</span>
            </div>
        `;
        list.appendChild(row);
    });
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
