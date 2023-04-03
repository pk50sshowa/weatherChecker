//Global variables for the application
var searchBtn = document.querySelector('#searchBtn');
var historyBtn = document.querySelector('#historyBtn');
var inputEl = document.querySelector('input');
var displayWeather = document.querySelector('#display-weather');

var cityName = [];
var apiKey = config.SG_API_KEY;

// Basic search function, takes input from the user and sends the input city name to the weather API to fetch weather information
function handleSearchSubmit() {
    if (!inputEl.value) {
        return;
    }
    var city = inputEl.value;
    fetchWeather(city);
    inputEl.value = '';
}

// Search function that works with search history buttons and their associated cities
function handleHistorySubmit(e) {
    console.log(cityName);
    console.log(e.target);
    var city = e.target.innerHTML;
    console.log(city);
    fetchWeather(city);
}

// Function to get weather information from the weather API, then calls functions to render current weather and get/render forecast weather, as well as the function to render the search history
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

// Function that renders the current weather for the input city, uses the DOM API to dynamically create elements on the page
function renderCurrentWeather(data) {
    document.getElementById('display-weather').innerHTML = "";

    var weatherList = document.createElement('ul');
    document.getElementById('display-weather').appendChild(weatherList);
    var dayJs = dayjs().format('MMMM D');
    console.log(dayJs);
    var weatherData1 = document.createElement('li');
    weatherData1.textContent = dayJs;
    // document.getElementById('display-weather').appendChild(weatherData);
    var img = document.createElement('img');
    img.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    // document.getElementById('display-weather').appendChild(img);
    var weatherData2 = document.createElement('li');
    weatherData2.textContent = data.main.temp + '°F';
    // document.getElementById('display-weather').appendChild(weatherData);
    var weatherData3 = document.createElement('li');
    weatherData3.textContent = data.wind.speed + ' MPH';
    // document.getElementById('display-weather').appendChild(weatherData);
    var weatherData4 = document.createElement('li');
    weatherData4.textContent = data.main.humidity + '%';
    // document.getElementById('display-weather').appendChild(weatherData);
    weatherList.append(weatherData1, img, weatherData2, weatherData3, weatherData4);
}

// Function that renders forecast weather for five days in the future thanks to a for loop
function renderForecastWeather(data) {
    document.getElementById('display-forecast').innerHTML = "";
    for (let i = 0; i < 40; i = i + 8) {
        var forecastTime = data.list[i].dt_txt;
        var weatherIcon = data.list[i].weather[0].icon;
        var forecastTemp = data.list[i].main.temp;
        var forecastWind = data.list[i].wind.speed;
        var forecastHumid = data.list[i].main.humidity;
        var dayJs = dayjs(forecastTime).format('MMMM D');
        console.log(dayJs);
        var weatherData = document.createElement('p');
        weatherData.textContent = dayJs;

        console.log(forecastTime);
        var weatherIcon = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
        console.log(weatherIcon);
        console.log(forecastTemp + '°F');
        console.log(forecastWind + ' MPH');
        console.log(forecastHumid + '%');

        var weatherList = document.createElement('ul');
        document.getElementById('display-forecast').appendChild(weatherList);
        var weatherData1 = document.createElement('li');
        weatherData1.textContent = dayJs;
        var img = document.createElement('img');
        img.src = weatherIcon;
        var weatherData2 = document.createElement('li');
        weatherData2.textContent = data.list[i].main.temp + '°F';
        var weatherData3 = document.createElement('li');
        weatherData3.textContent = data.list[i].wind.speed + ' MPH';
        var weatherData4 = document.createElement('li');
        weatherData4.textContent = data.list[i].main.humidity + '%';
        weatherList.append(weatherData1, img, weatherData2, weatherData3, weatherData4);
    }
}

// Function to render the search history
function renderSearchHistory(data) {
    console.log(cityName);
    var city = data.city.name;
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

// Global event listener for the function's base search button
searchBtn.addEventListener('click', handleSearchSubmit);