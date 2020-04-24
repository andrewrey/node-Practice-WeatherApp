const https = require('https');
const http = require('http');
const api = require('./api.json');


function printWeather(weatherData, city){
  let message = `Today's weather in ${weatherData.name} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp} degrees Celcius.`;
  console.log(message);

}

function getWeather(city){
  try{
    let request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api.key}`, response =>{
      if (response.statusCode === 200) {
        let body = '';
        response.on('data', d => body += d.toString());
        response.on('end', ()=>{
          try{
            let dataJSON = JSON.parse(body);
            printWeather(dataJSON, city);
          
          } catch(error){
            console.error('JSON Error:', error.name)
          }
        });
      } else {
        //Status Code Error//
        const statusCodeError = new Error(`There was an error getting the message for ${city}. (${http.STATUS_CODES[response.statusCode]})`);
        console.error(statusCodeError.message);
      }
        
    }).on('error', error => {
      console.error("Problems:",error.message);
    });
  } catch (error) {
    console.error("WTF:", error.message)
  }
}

module.exports.get = getWeather;