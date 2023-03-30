var searchBtn = document.querySelector('#searchBtn');
var inputEl = document.querySelector('input');
var apiKey = `7ab439372a6b7834b1058543aced3bee`;

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
            console.log(lat, lon);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    renderForecastWeather(data);
                })
        });

    function renderCurrentWeather(data) {
            // Get data, output to screen
    }

    function renderForecastWeather(data) {
        for (let i = 3; data.list.length; i = i+8) {
            // Create element, make cards
        }
    }

    // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
}

// data.name
// data.coord.lon
// data.coord.lat
// data.main.temp
// dt (uses day.js)

searchBtn.addEventListener('click', handleSearchSubmit);