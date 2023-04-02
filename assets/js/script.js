var searchBtn = document.querySelector('#searchBtn');
var historyBtn = document.querySelector('#historyBtn');
var inputEl = document.querySelector('input');
var displayWeather = document.querySelector('#display-weather');

var cityName = [];
var apiKey = `8650ce0b104f1fb62c2dab553fc70e25`;

function handleSearchSubmit() {
    if (!inputEl.value) {
        return;
    }
    var city = inputEl.value;
    fetchWeather(city);
    inputEl.value = '';
}

function handleHistorySubmit(e) {
    console.log(cityName);
    console.log(e.target);
    var city = e.target.innerHTML;
    console.log(city);
    fetchWeather(city);
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
                    renderSearchHistory(data);
                })
        });
}

function renderCurrentWeather(data) {
    document.getElementById('display-weather').innerHTML = "";

    var dayJs = dayjs().format('MMMM D');
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
    document.getElementById('display-forecast').innerHTML = "";

    for (let i = 0; i < 40; i = i + 8) {
        var forecastTime = data.list[i].dt_txt;
        var weatherIcon = data.list[i].weather[0].icon;
        var forecastTemp = data.list[i].main.temp;
        var forecastWind = data.list[i].wind.speed;
        var forecastHumid = data.list[i].main.humidity;

        console.log(forecastTime);
        var weatherIcon = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
        console.log(weatherIcon);
        console.log(forecastTemp + '°F');
        console.log(forecastWind + ' MPH');
        console.log(forecastHumid + '%');

        var weatherList = document.createElement('ul');
        document.getElementById('display-forecast').appendChild(weatherList);
        var weatherData = document.createElement('li');
        weatherData.textContent = data.list[i].dt_txt;
        document.getElementById('display-forecast').appendChild(weatherData);
        var img = document.createElement('img');
        img.src = weatherIcon;
        document.getElementById('display-forecast').appendChild(img);
        var weatherData = document.createElement('li');
        weatherData.textContent = data.list[i].main.temp + '°F';
        document.getElementById('display-forecast').appendChild(weatherData);
        var weatherData = document.createElement('li');
        weatherData.textContent = data.list[i].wind.speed + ' MPH';
        document.getElementById('display-forecast').appendChild(weatherData);
        var weatherData = document.createElement('li');
        weatherData.textContent = data.list[i].main.humidity + '%';
        document.getElementById('display-forecast').appendChild(weatherData);
    }
}

function renderSearchHistory(data) {
    console.log(cityName);
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
    var city = data.city.name;
    console.log(lat, lon);
    console.log(city);

    var weatherButton = document.createElement('button');
    weatherButton.textContent = city; 
    weatherButton.setAttribute("id", "#historyBtn");
    weatherButton.addEventListener('click', handleHistorySubmit);
    document.getElementById('search-history').appendChild(weatherButton);

    cityName.push(city);
    var string = JSON.stringify(cityName);
    localStorage.setItem("cityName", string);
    
}

searchBtn.addEventListener('click', handleSearchSubmit);
