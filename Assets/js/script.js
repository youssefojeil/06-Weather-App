// Global variables
// search history as an empty array
// weather api root url
// api key

//
var apiKey = `6735dc29946d3cda39fe5ca05b775eab`;
var city;
var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

//console.log(forecastURL);
console.log(queryURL);


// DOM element references
// search form
// search input
// container/section for today's weather
// container/section for the forecast
// search history container
var inputEl = document.getElementById("user-input");
var searchEl = document.getElementById("search-btn");
var weatherEl = document.querySelector(".weather");
var forecastEl = document.querySelector(".forecast");
var searchHistoryEl = document.querySelector(".search-history");

console.log(inputEl);
console.log(searchEl);
console.log(weatherEl);
console.log(forecastEl);
console.log(searchHistoryEl);


// Funtion to display the search history list.

function renderSearchHistory(){
    // empty the search history container
    searchHistoryEl.innerHTML = "";

    // loop through the history array creating a button for each item
    for(var i = 0; i < localStorage.length; i ++) {
    
       console.log(localStorage.getItem(localStorage.key(i)));
       var city = localStorage.getItem(localStorage.key(i));
       var cityButton = document.createElement("button");
       
       cityButton.setAttribute("class" , "btn, btn-lg, btn-block history-btn");
       cityButton.textContent = city;
       searchHistoryEl.appendChild(cityButton);
    }
        // append to the search history container
    
}



// function to update history in local storage then updates displayed history 
function appendToHistory(search) {
    // push search term into search history array
    console.log(search);
    cityName = search.charAt(0).toUpperCase() + search.slice(1);
    console.log(cityName);
    // set search history array to local storage
    localStorage.setItem(cityName,cityName);
    console.log(localStorage);

    //var cityWeather 
    renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
    // get search history item from local storage
 
   // set search history array equal to what you got from local storage
   renderSearchHistory();
 }
 


// function to display the CURRENT weather data fetched from OpenWeather api.

function renderCurrentWeather(cityName, data) {
    // store response data from our fetch request in variables
    // empty out weather container
    weatherEl.innerHTML = "";
    weatherEl.setAttribute("class", "basic-card-style");
    // temperature, wind speed, etc,
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    console.log(cityName);
    console.log(data);
    var temp = data.current.temp;
    var windspeed = data.current.wind_speed;
    var humidity = data.current.humidity;

    var iconCode = data.daily[0].weather[0].icon;
    var iconImg = document.createElement("img");
    iconImg.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    console.log(iconImg);
    console.log(iconCode);
    
    var now = dayjs().format("MM/DD/YYYY");
    console.log(temp);
    console.log(windspeed);
    console.log(humidity);

    // document.create the elements you'll want to put this info in
    var cityEl = document.createElement("h1")
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    // append elements to document
    weatherEl.appendChild(cityEl);
    weatherEl.appendChild(iconImg);
    weatherEl.appendChild(tempEl);
    weatherEl.appendChild(windEl);
    weatherEl.appendChild(humidityEl);
    // give them appropriate content
    cityEl.textContent = `${cityName} (${now})`;
    tempEl.textContent = `Temp: ${temp} °F`;
    windEl.textContent = `Wind: ${windspeed} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    
}



// Function to display 5 day forecast
function renderForecast(dailyForecast) {
    // set up elements for this section
    console.log(dailyForecast);
    
    forecastEl.innerHTML = "";
    var fiveDays = dailyForecast.length -3;
    
    var newForecastDiv = document.createElement("div");
    var headerForecast = document.createElement("h2");
    forecastEl.appendChild(headerForecast);
    forecastEl.appendChild(newForecastDiv);

    forecastEl.setAttribute("class", "basic-card-style");
    newForecastDiv.setAttribute("class", "row");
    headerForecast.textContent = "5 Day Forecast:";
    

    var now = dayjs();
    


    // append 
    console.log(dailyForecast.length);
    // loop over dailyForecast
    for(var i = 0; i < fiveDays; i++){
        // send the data to our renderForecast Function as an arguement
        console.log(dailyForecast);
        console.log(dailyForecast[i].temp.day);
        console.log(dailyForecast[i].wind_speed);
        console.log(dailyForecast[i].humidity);
        //renderForecastCard(dailyForecast[i]);
        // create elements for a card   // document.create the elements you'll want to put this info in
        //var cityEl = document.createElement("h1")
        var forecastCard = document.createElement("div");
        var tempEl = document.createElement("p");
        var windEl = document.createElement("p");
        var humidityEl = document.createElement("p");
        var dateEl = document.createElement("h4");

        var iconCode = dailyForecast[i].weather[0].icon;
        var iconImg = document.createElement("img");
        iconImg.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        var date = now.add(i+1, "day").format("MM/DD/YYYY");


        // append elements to document
        newForecastDiv.appendChild(forecastCard);
        forecastCard.setAttribute("class", "forecast-card, col");
        forecastCard.appendChild(dateEl);
        forecastCard.appendChild(iconImg);
        forecastCard.appendChild(tempEl);
        forecastCard.appendChild(windEl);
        forecastCard.appendChild(humidityEl);
        // give them appropriate content

        dateEl.textContent = date;
        tempEl.textContent = `Temp: ${dailyForecast[i].temp.day} °F`;
        windEl.textContent = `Wind: ${dailyForecast[i].wind_speed} MPH`;
        humidityEl.textContent = `Humidity: ${dailyForecast[i].humidity} %`;

    }
       
}


function renderItems(cityName, data) {
    console.log(data);
    var dailyForcast = data.daily;
    renderCurrentWeather(cityName, data);
    renderForecast(dailyForcast);
    
}


// fetches weather data for given location from the weather geolocation
// endpoint; then calls functions to display current and forecast weather data
function fetchWeather(lat, lon, city) {
    // variables of long, lat, city name - coming from location
    var cityLat = lat;
    var cityLon = lon;
    var cityName = city;
    console.log(cityLat);
    console.log(cityLon);
    // api url
    var apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    // fetch using the api url .then that returns response as json, 
    //.then that calls renderItems(city,data)
    console.log(apiUrl);

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          renderItems(cityName, data);
        });
      } 
      else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Openweathermap');
    });
}


function fetchCoords(search) {
    // variable for your api url
    var city = search;
    var geoCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    console.log(geoCodeUrl);
    
    // fetch with your url, .then that returns the response in json, .then that does 
    // 2 things - calls appendToHistory(search), calls fetchWeather(the data)
    
    fetch(geoCodeUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(`${city} lat is ${data[0].lat}`);
          console.log(`${city} lon is ${data[0].lon}`);
          var lat = data[0].lat;
          var lon = data[0].lon;
          appendToHistory(search)
          fetchWeather(lat, lon, city);
        });
      } 
      else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Openweathermap');
    });
}


function handleWeatherSearch() {
    // dont continue if there is nothing in the search form
    //alert("Button Clicked!");
    console.log(inputEl.value);
    if (!inputEl.value) {
        inputEl.value = "Please Enter a valid City!";
        return;
    }
    
    var search = inputEl.value;
    fetchCoords(search);
    inputEl.value = "";
}


function handleSearchHistoryClick(e) {
    // grab whatever city they clicked
    console.log(e.target.textContent);
    console.log(this);
    search = e.target.textContent;
    fetchCoords(search);
}



initSearchHistory();


// click event to run the handleFormSubmit
searchEl.addEventListener("click", handleWeatherSearch);

// click event to run the handleSearchHistoryClick
searchHistoryEl.addEventListener("click", handleSearchHistoryClick);