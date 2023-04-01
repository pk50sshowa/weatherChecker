var searchBtn = document.querySelector('#searchBtn');
var inputEl = document.querySelector('input');
var displayWeather = document.querySelector('#display-weather');

var apiKey = `8650ce0b104f1fb62c2dab553fc70e25`;

function handleSearchSubmit() {
    if (!inputEl.value) {
        return;
    }
    var city = inputEl.value;
    fetchWeather(city);
    inputEl.value = '';
}

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`)
        .then((response) => response.json())
        .then((data) => 
        {
            console.log(data);
            renderCurrentWeather(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var name = data.name;
            var windSpeed = data.wind.speed;
            var mainTemp = data.main.temp;
            var mainHumid = data.main.humidity;
            var weatherIcon = data.weather[0].icon;
            var dayJs = dayjs().format('dddd, MMMM D');
            console.log(lat, lon);
            console.log(name);
            console.log(windSpeed);
            console.log(mainTemp);
            console.log(mainHumid);
            console.log(weatherIcon);
            console.log(dayJs);
            var weatherIcon = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
            console.log(weatherIcon);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    renderForecastWeather(data);
                })
        });

    function renderCurrentWeather(data) {
            var dayJs = dayjs().format('dddd, MMMM D');
            // var weatherIcon = data.hourly.weather.icon;
            var forecastTemp = data.hourly.temp;
            var forecastWind = data.hourly.wind_speed;
            var forecastHumid = data.hourly.humidity;
            console.log(dayJs);
            // console.log(weatherIcon);
            console.log(forecastTemp);
            console.log(forecastWind);
            console.log(forecastHumid);
            // var weatherData = document.createElement('p');
            // document.getElementById('#display-weather').appendChild(weatherData);
            // Get data, output to screen
            // data.name (City name), data.wind.speed (windspeed), data.main.temp (temperature), data.main.humidity (humidity), day.js (date), data.weather[0].icon (weather icon) 
    }

    function renderForecastWeather(data) {
        for (let i = 3; data.list.length; i = i+8) {
            // Create element, make cards
        }
    }

    // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
}

searchBtn.addEventListener('click', handleSearchSubmit);