// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)
  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location & days
    let locationInput = document.querySelector('#location')
    let daysInput = document.querySelector('#days')

    // - Get the user-entered location and days from the element's value
    let location = locationInput.value
    let numDays = daysInput.value

    // - Check to see if the user entered anything; if so:
    if(location.length > 0 && numDays.length > 0) {
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=2b596cf6ba0c404eb2f153901212704&q=${location}&days=${numDays}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let currentLocation = json.location
      let currentWeather = json.current
      let currentForecast = json.forecast

      //Get a reference to the current element
      let locationElement = document.querySelector(`.current`)

      //Use the given formatting and plug in the city name, icon, temperature and description
      locationElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${currentLocation.name}, ${currentLocation.region}</div>
            <div class="font-bold">
              <img src= "https:${currentWeather.condition.icon}" class="inline-block">
              <span class="temperature">${currentWeather.feelslike_f}</span>° 
              and
              <span class="conditions">${currentWeather.condition.text}</span>
          </div>
        </div>`

      //Get reference to forecast element
      let forecastList = document.querySelector(`.forecast`)
      
      //Use the given formatting and plug in the header
      forecastList.innerHTML = `
      <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${numDays} Day Forecast</div>
        
      </div>`

      //Loop through the forecast array to display weather for the number of days as input by user
      for(let i = 0; i < numDays; i++){
        // Create variable to store each daily forecast in memory
        let tempForecast = currentForecast.forecastday[i]
        
        //Now add in the list formatting and plug in values for maxtemp, min temp, date, icon, condition, etc.
        forecastList.insertAdjacentHTML(`beforeend`, 
        `<div class="text-center space-y-8">
          <div>
            <img src="https:${tempForecast.day.condition.icon}" class="mx-auto">
            <h1 class="text-2xl text-bold text-gray-500">${tempForecast.date}</h1>
            <h2 class="text-xl">High ${tempForecast.day.maxtemp_f}° – Low ${tempForecast.day.mintemp_f}°</h2>
            <p class="text-gray-500">${tempForecast.day.condition.text}</h1>
          </div>
        </div>`
        )
      }


    }
  })  
})