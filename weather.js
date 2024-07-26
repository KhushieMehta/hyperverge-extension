document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = "e75b39b56e354740aa3102619211504";
    const REQUESTED_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&aqi=yes&q=`;
    
    const inputRef = document.getElementById('location');
    const queryBtn = document.getElementById('query-btn');
    const loadingDiv = document.getElementById('loading');
    const weatherInfoDiv = document.getElementById('weather-info');

    queryBtn.addEventListener('click', search);

    function search() {
        const defaultCity = 'mumbai';
        const query = inputRef.value === '' ? defaultCity : inputRef.value;
        const url = `${REQUESTED_URL}${query}`;
        
        loadingDiv.style.display = 'block';
        weatherInfoDiv.classList.add('hidden');
        
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                loadingDiv.style.display = 'none';
                displayWeather(result);
            })
            .catch(() => {
                loadingDiv.style.display = 'none';
                weatherInfoDiv.classList.add('hidden');
            });
    }

    function getEmoji(aqi) {
        if (aqi < 50) return '😁';
        if (aqi < 100) return '😊';
        if (aqi < 150) return '😐';
        if (aqi < 200) return '😷';
        if (aqi < 300) return '🤢';
        return '💀';
    }

    function displayWeather(weather) {
        const userLocation = `${weather.location.name}, ${weather.location.country}`;
        const temperature = `${weather.current.temp_c}°C`;
        const tempIcon = `https:${weather.current.condition.icon}`;
        const aqi = weather.current.air_quality.pm10.toFixed(2);
        const aqiIcon = getEmoji(aqi);

        weatherInfoDiv.innerHTML = `
            <div class="weather-container" id="weather-container">
                <div id="location-name">${userLocation}</div>
                <div id="temperature">
                    Temperature: ${temperature}
                    <img src="${tempIcon}" alt="weather icon" class="icon" />
                </div>
                <div id="aqi">
                    Air Quality Index: ${aqi} ${aqiIcon}
                </div>
            </div>
        `;
        
        weatherInfoDiv.classList.remove('hidden');
    }
});
