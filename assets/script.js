var searchEl = document.getElementById('searchEl');
var inputEl = document.getElementById('input');
var locationEl = document.getElementById('location');
var tempEl = document.getElementById('temp')
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var iconEl = document.getElementById('icon');
let long = '';
let lat = '';
let cityName = '';
let temp = '';
let wind = '';
let humidity = '';



// var input = inputEl.value;

function getApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=imperial&appid=661ce37637de1a08c96f23fd8b00ce77';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityName = data.city.name;
      temp = data.list[0].main.temp;
      wind = data.list[0].wind.speed;
      humidity = data.list[0].main.humidity;

      humidityEl.innerHTML = 'Humidity: ' + humidity + '%';
      windEl.innerHTML = 'Wind: ' + wind + ' MPH';
      tempEl.innerHTML = 'Temp: ' + temp + '°F';
      locationEl.innerHTML = cityName;

      
    })
  }

const geocoder = new MapboxGeocoder({
  accessToken: 'pk.eyJ1Ijoia2lwc2NoNDEiLCJhIjoiY2w5MXdzdTkwMWVwMzN2bncxem1pc3Z3aiJ9.I4w2LZGse8McsgKLDw5e-g',
  types: 'country,region,place,postcode,locality,neighborhood'
});

geocoder.on('result', function(data) {
  long = data.result.geometry.coordinates[0];
  lat = data.result.geometry.coordinates[1];

})
 
geocoder.addTo('#geocoder');
searchEl.addEventListener('click', getApi);
