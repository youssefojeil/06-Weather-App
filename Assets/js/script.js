// Global variables
// search history as an empty array
// weather api root url
// api key


// DOM element references
// search form
// search input
// container/section for today's weather
// container/section for the forecast
// search history container


// Fcuntion to display the search history list.

function renderSearchHistory(){
    // empty the search history container

    // loop through the history array creating a button for each item

        // append to the search history container
}

// function to update history in local storage then updates displayed history 
function appendToHistory(search) {
    // push search term into search history array

    // set search history array to local storage

    renderSearchHistory();
}

// function to display the CURRENT weather data fetched from OpenWeather api.

function renderCurrentWeather(city, weather) {
    // store response data from our fetch request in variables
        // temperature, wind speed, etc,

    // document.create the elements you'lll want to put this info in
    
    // append elements to document

    // give them appropriate content
}


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

function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0]);
    renderForecast(data.list);
}


// fetches weather data for given location from the weather geolocation
// endpoint; then calls functions to display current and forecast weather data

function fetchWeather(location) {
    // variables of long, lat, city name - coming from location

    // api url

    // fetch using the api url .then that returns response as json, .then that calls renderItems(city,data)
}

function fetchCoords(search) {
    // variable for your api url

    // fetch with your url, .then that returns the response in json, .then that does 2 things - calls appendToHistory(search), calls fetchWeather(the data)
}

function handleSearchFormSubmit(e) {
    // dont continue if there is nothing in the search form

    if (!searchInput.value) {
        return;
    }

    e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    serachInput.value = "";
}

function handleSearchHistoryClick(e) {
    // grab whatever city they clicked

    fetchCoords(search);
}


initSearchHistory();

// click event to run the handleFormSubmit
// click event to run the handleSearchHistoryClick