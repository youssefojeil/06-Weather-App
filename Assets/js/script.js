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


/*
function renderSearchHistory(){
    // empty the search history container

    // loop through the history array creating a button for each item

        // append to the search history container
}

*/
/*
// function to update history in local storage then updates displayed history 
function appendToHistory(search) {
    // push search term into search history array

    // set search history array to local storage

    renderSearchHistory();
}
*/

// function to display the CURRENT weather data fetched from OpenWeather api.

function renderCurrentWeather(city, weather) {
    // store response data from our fetch request in variables
        // temperature, wind speed, etc,

    // document.create the elements you'lll want to put this info in
    
    // append elements to document

    // give them appropriate content
}


/*
// Function to display a FORECAST card given an object(from our renderforecast fucntion) from openweather api
// daily forecast
function renderForecastCard(forecast) {
    // variables for data from api
        // temp, windspeed, etc
    
    // create elements for a card

    //append

    // add content to elements

    // append to forecast section
}
*/
/*
// Function to display 5 day forecast
function renderForecast(dailyForecast) {
    // set up elements for this section

    // append 

    // loop over dailyForecast
        for(var i = 0; i < dailyForecast.length; i++){
            // send the data to our renderForecast Function as an arguement
            renderForecastCard(dailyForecast[i]);
        }
}
*/

function renderItems(cityName, temp, windspeed, humidity) {
    var cityName = cityName;
    var cityTemp = temp;
    var cityWindSpeed = windspeed;
    var cityHumidity = humidity;
    renderCurrentWeather(cityName, cityTemp, cityWindSpeed, cityHumidity);
    //renderForecast(data.list);
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
          var temp = data.current.temp;
          var windspeed = data.current.wind_speed;
          var humidity = data.current.humidity;
          console.log(`temp is ${temp}`);
          console.log(`windspeed is ${windspeed}`);
          console.log(`humidity is ${humidity}`);
          renderItems(cityName, temp, windspeed, humidity);
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
          //appendToHistory(search)
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

/*
function handleSearchHistoryClick(e) {
    // grab whatever city they clicked

    fetchCoords(search);
}
*/

//initSearchHistory();



// click event to run the handleFormSubmit
searchEl.addEventListener("click", handleWeatherSearch);
// click event to run the handleSearchHistoryClick