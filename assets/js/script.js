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
        .then((data) => {
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
        console.log(dayJs);
        var weatherData = document.createElement('p');
        weatherData.textContent = dayJs;
        document.getElementById('display-weather').appendChild(weatherData);
        var img = document.createElement('img');
        img.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        document.getElementById('display-weather').appendChild(img);
        var weatherData = document.createElement('p');
        weatherData.textContent = data.main.temp + '°F';
        document.getElementById('display-weather').appendChild(weatherData);
        var weatherData = document.createElement('p');
        weatherData.textContent = data.wind.speed + ' MPH';
        document.getElementById('display-weather').appendChild(weatherData);
        var weatherData = document.createElement('p');
        weatherData.textContent = data.main.humidity + '%';
        document.getElementById('display-weather').appendChild(weatherData);
    }

    function renderForecastWeather(data) {
        for (let i = 0; i < 40; i = i + 8) {
            var forecastTime = data.list[i].dt_txt;
            var weatherIcon = data.list[i].weather[0].icon;
            var forecastTemp = data.list[i].main.temp;
            var forecastWind = data.list[i].wind.speed;
            var forecastHumid = data.list[i].main.humidity;

            var weatherData = document.createElement('p');
            weatherData.textContent = forecastTime;
            document.getElementById('display-forecast').appendChild(weatherData);

            console.log(forecastTime);
            var weatherIcon = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
            console.log(weatherIcon);
            console.log(forecastTemp + '°F');
            console.log(forecastWind + ' MPH');
            console.log(forecastHumid + '%');

            var weatherData = document.createElement('p');
            weatherData.textContent = forecastTime;
            console.log(forecastTime);
            document.getElementById('display-forecast').appendChild(weatherData);
            // var weatherData = document.createElement('p');
            // weatherData.textContent = weatherIcon;
            // document.getElementById('display-forecast').appendChild(weatherData);
            // var img = document.createElement('img');
            // img.src = weatherIcon;
            // document.getElementById('display-forecast').appendChild(img);
            // var weatherData = document.createElement('p');
            // weatherData.textContent = data.list[i].main.temp + '°F';
            // document.getElementById('display-forecast').appendChild(weatherData);
            // var weatherData = document.createElement('p');
            // weatherData.textContent = data.list[i].wind.speed + ' MPH';
            // document.getElementById('display-forecast').appendChild(weatherData);
            // var weatherData = document.createElement('p');
            // weatherData.textContent = data.list[i].main.humidity + '%';
            // document.getElementById('display-forecast').appendChild(weatherData);
        }

        for (let i = 3; data.list.length; i = i + 8) {
        }
    }

    // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
}

searchBtn.addEventListener('click', handleSearchSubmit);