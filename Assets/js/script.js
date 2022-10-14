// Global variables
var apiKey = `6735dc29946d3cda39fe5ca05b775eab`;
var city;
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;


// DOM element references
var inputEl = document.getElementById("user-input");
var searchEl = document.getElementById("search-btn");
var weatherEl = document.querySelector(".weather");
var forecastEl = document.querySelector(".forecast");
var searchHistoryEl = document.querySelector(".search-history");


// Funtion to display the search history list on page
function renderSearchHistory(){
    // empty the search history container
    searchHistoryEl.innerHTML = "";

    // loop through the history array creating a button for each item
    for(var i = 0; i < localStorage.length; i ++) {
    
       var city = localStorage.getItem(localStorage.key(i));
       var cityButton = document.createElement("button");
       
       cityButton.setAttribute("class" , "btn, btn-lg, btn-block history-btn");
       cityButton.textContent = city;
       searchHistoryEl.appendChild(cityButton);
    }
}



// function to update history in local storage then updates displayed history 
function appendToHistory(search) {
    // convert first letter of city name to uppercase 
    cityName = search.charAt(0).toUpperCase() + search.slice(1);
    
    // set city name and key to local storage 
    localStorage.setItem(cityName, cityName);

    // call render search history function
    renderSearchHistory();
}

// Function to get search history from local storage
function initSearchHistory() {
    
   // calls rendersearch history function
   renderSearchHistory();
 }
 


// function to display the CURRENT weather data fetched from OpenWeather api.
function renderCurrentWeather(cityName, data) {
    
    // empty out weather container & add styling
    weatherEl.innerHTML = "";
    weatherEl.setAttribute("class", "basic-card-style");
   
    // convert first letter of city name to uppercase
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    // local variables from data object temperature, wind speed, etc,
    var temp = data.current.temp;
    var windspeed = data.current.wind_speed;
    var humidity = data.current.humidity;

    var iconCode = data.daily[0].weather[0].icon;
    var iconImg = document.createElement("img");
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // get current date & format
    var now = dayjs().format("MM/DD/YYYY");

    // create elements needed
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
    // give elements data
    cityEl.textContent = `${cityName} (${now})`;
    tempEl.textContent = `Temp: ${temp} °F`;
    windEl.textContent = `Wind: ${windspeed} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    
}


// Function to display 5 day forecast
function renderForecast(dailyForecast) {
    
    // clear out forecast container    
    forecastEl.innerHTML = "";
    // one call api gives 8 day daily, subtract 3 to get the next 5 days
    var fiveDays = dailyForecast.length -3;
    
    // create elements for current section 
    var newForecastDiv = document.createElement("div");
    var headerForecast = document.createElement("h2");
    // append elements to document
    forecastEl.appendChild(headerForecast);
    forecastEl.appendChild(newForecastDiv);

    // add styling to elements & content 
    forecastEl.setAttribute("class", "basic-card-style");
    newForecastDiv.setAttribute("class", "row");
    headerForecast.textContent = "5 Day Forecast:";
    
    // get current date
    var now = dayjs();
    
    // loop over dailyForecast
    for(var i = 0; i < fiveDays; i++){
       
        // create elements for each day card 
        var forecastCard = document.createElement("div");
        var tempEl = document.createElement("p");
        var windEl = document.createElement("p");
        var humidityEl = document.createElement("p");
        var dateEl = document.createElement("h4");

        var iconCode = dailyForecast[i].weather[0].icon;
        var iconImg = document.createElement("img");
        iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 
        var date = now.add(i+1, "day").format("MM/DD/YYYY");

        // append elements to document
        newForecastDiv.appendChild(forecastCard);
        forecastCard.setAttribute("class", "forecast-card, col");
        forecastCard.appendChild(dateEl);
        forecastCard.appendChild(iconImg);
        forecastCard.appendChild(tempEl);
        forecastCard.appendChild(windEl);
        forecastCard.appendChild(humidityEl);
        
        // give elements appropriate data and content 
        dateEl.textContent = date;
        tempEl.textContent = `Temp: ${dailyForecast[i].temp.day} °F`;
        windEl.textContent = `Wind: ${dailyForecast[i].wind_speed} MPH`;
        humidityEl.textContent = `Humidity: ${dailyForecast[i].humidity} %`;
    } 
}

// render items function 
function renderItems(cityName, data) {
    // variable to get data needed for forecast and pass to render forecast 
    var dailyForcast = data.daily;
    // call render current weather & renderforecast
    // pass city name and data object 
    renderCurrentWeather(cityName, data);
    renderForecast(dailyForcast);
    
}


// fetch weather function 
function fetchWeather(lat, lon, city) {
    // variables of long, lat, city name - coming from location
    var cityLat = lat;
    var cityLon = lon;
    var cityName = city;

    // api url
    var apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    // fetch using the api url .then that returns response as json, 
    //.then that calls renderItems(city,data)

    // fetch onecall api data 
    // & calls renderItems passing cityName & data obj
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

// fetch coordinates function from user input
function fetchCoords(search) {
    // store user input in city 
    var city = search;
    // geocode api 
    var geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
   
    // fetch geocode data and call history passing search 
    // call fetch weather passing lat lon and city 
    fetch(geoCodeUrl)
    .then(function (response) {
      if (response.ok) {

        response.json().then(function (data) {

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

// user input function
function handleWeatherSearch() {

    // dont continue if input is empty
    if (!inputEl.value) {
        alert("Please Enter A Valid City!");
        return;
    }
    // if input full call fetch coords
    var search = inputEl.value;
    fetchCoords(search);
    inputEl.value = "";
}

// function for search history button to grab weather data 
function handleSearchHistoryClick(e) {
    // grab whatever city they clicked
    search = e.target.textContent;
    // call fetch coords func passing user input 
    fetchCoords(search);
}


// init local storage on reload
initSearchHistory();


// click event to run the handleFormSubmit
searchEl.addEventListener("click", handleWeatherSearch);

// click event to run the handleSearchHistoryClick
searchHistoryEl.addEventListener("click", handleSearchHistoryClick);