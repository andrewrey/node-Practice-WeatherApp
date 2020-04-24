const weather = require('./weather');

let locationQuery = process.argv.slice(2);
weather.get(locationQuery)