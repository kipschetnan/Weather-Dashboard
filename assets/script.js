var searchEl = document.getElementById('searchEl');
var inputEl = document.getElementById('input');
var locationEl = document.getElementById('location');
var tempEl = document.getElementById('temp')
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var iconEl = document.getElementById('icon');
var day1El = document.getElementById('day1');
var day1El = document.getElementById('day2');
var day1El = document.getElementById('day3');
var day1El = document.getElementById('day4');
var day1El = document.getElementById('day5');
var temp1El = document.getElementById('temp1');
var wind1El = document.getElementById('wind1');
var humidity1El = document.getElementById('humidity1');
var temp2El = document.getElementById('temp2');
var wind2El = document.getElementById('wind2');
var humidity2El = document.getElementById('humidity2');
var temp3El = document.getElementById('temp3');
var wind3El = document.getElementById('wind3');
var humidity3El = document.getElementById('humidity3');
var temp4El = document.getElementById('temp4');
var wind4El = document.getElementById('wind4');
var humidity4El = document.getElementById('humidity4');
var temp5El = document.getElementById('temp5');
var wind5El = document.getElementById('wind5');
var humidity5El = document.getElementById('humidity5');
var geocoderEl = document.getElementById('geocoder');
var listEl = document.getElementById('list');
var date1 = document.getElementById('date1');
var date2 = document.getElementById('date2');
var date3 = document.getElementById('date3');
var date4 = document.getElementById('date4');
var date5 = document.getElementById('date5');

var today = moment();
tDate = today.format("MM/DD/YY");
d1Date = today.add(1, 'days').format("MM/DD/YY");
d2Date = today.add(1, 'days').format("MM/DD/YY");
d3Date = today.add(1, 'days').format("MM/DD/YY");
d4Date = today.add(1, 'days').format("MM/DD/YY");
d5Date = today.add(1, 'days').format("MM/DD/YY");


let dataObject;
let long = '';
let lat = '';
let history = [];


function weatherDash(data) {
  let cityName = data.city.name;
  let temp = data.list[0].main.temp;
  let wind = data.list[0].wind.speed;
  let humidity = data.list[0].main.humidity;


  humidityEl.innerHTML = 'Humidity: ' + humidity + '%';
  windEl.innerHTML = 'Wind: ' + wind + ' MPH';
  tempEl.innerHTML = 'Temp: ' + temp + '°F';
  locationEl.innerHTML = cityName + ' ' + '(' + tDate + ')';
  ;
}

function day1(data) {
  let temp = data.list[11].main.temp;
  let wind = data.list[11].wind.speed;
  let humidity = data.list[11].main.humidity;

  date1.innerHTML = d1Date;
  humidity1El.innerHTML = 'Humidity: ' + humidity + '%';
  wind1El.innerHTML = 'Wind: ' + wind + ' MPH';
  temp1El.innerHTML = 'Temp: ' + temp + '°F';

}

function day2(data) {
  let temp = data.list[19].main.temp;
  let wind = data.list[19].wind.speed;
  let humidity = data.list[19].main.humidity;

  date2.innerHTML = d2Date;
  humidity2El.innerHTML = 'Humidity: ' + humidity + '%';
  wind2El.innerHTML = 'Wind: ' + wind + ' MPH';
  temp2El.innerHTML = 'Temp: ' + temp + '°F';

}

function day3(data) {
  let temp = data.list[27].main.temp;
  let wind = data.list[27].wind.speed;
  let humidity = data.list[27].main.humidity;

  date3.innerHTML = d3Date;
  humidity3El.innerHTML = 'Humidity: ' + humidity + '%';
  wind3El.innerHTML = 'Wind: ' + wind + ' MPH';
  temp3El.innerHTML = 'Temp: ' + temp + '°F';

}

function day4(data) {
  let temp = data.list[35].main.temp;
  let wind = data.list[35].wind.speed;
  let humidity = data.list[35].main.humidity;

  date4.innerHTML = d4Date;
  humidity4El.innerHTML = 'Humidity: ' + humidity + '%';
  wind4El.innerHTML = 'Wind: ' + wind + ' MPH';
  temp4El.innerHTML = 'Temp: ' + temp + '°F';

}

function day5(data) {
  let temp = data.list[39].main.temp;
  let wind = data.list[39].wind.speed;
  let humidity = data.list[39].main.humidity;

  date5.innerHTML = d5Date;
  humidity5El.innerHTML = 'Humidity: ' + humidity + '%';
  wind5El.innerHTML = 'Wind: ' + wind + ' MPH';
  temp5El.innerHTML = 'Temp: ' + temp + '°F';

}

function getApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=imperial&appid=661ce37637de1a08c96f23fd8b00ce77';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      dataObject = data;
      weatherDash(dataObject);
      day1(dataObject);
      day2(dataObject);
      day3(dataObject);
      day4(dataObject);
      day5(dataObject);
      
    
    })
    
    localStorage.setItem('list', JSON.stringify(history));
    var storedHistory = JSON.parse(localStorage.getItem('list'));
    var li = document.createElement("li");

    for(var i = 0; i < storedHistory.length; i++) {      
      console.log(storedHistory[i]);
      li.innerHTML = storedHistory[i];
      listEl.appendChild(li);
    }


  }

const geocoder = new MapboxGeocoder({
  accessToken: 'pk.eyJ1Ijoia2lwc2NoNDEiLCJhIjoiY2w5MXdzdTkwMWVwMzN2bncxem1pc3Z3aiJ9.I4w2LZGse8McsgKLDw5e-g',
  types: 'country,region,place,postcode,locality,neighborhood'
});

geocoder.on('result', function(data) {
  long = data.result.geometry.coordinates[0];
  lat = data.result.geometry.coordinates[1];
  history.push(data.result.place_name);
  console.log(history)
})
 

geocoder.addTo('#geocoder');
searchEl.addEventListener('click', getApi);
