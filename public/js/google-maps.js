var geoJSON;
var request;
var gettingData = false;

async function getWeatherData(lat, lon) {
  const url = `${APP_URL}/api/weather/getweather?lat=${lat}&lon=${lon}`;

  const result = await fetch(url);
  const data = await result.json();
  return data;
}

async function setInfoWindow(lat, lng) {
  var getWeather = await getWeatherData(lat, lng);

  infowindow ?? infowindow.close();

  infowindow.setOptions({
    position: {
      lat,
      lng,
    },
    pixelOffset: {
      width: 0,
      height: -15,
    },
  });

  infowindow.setContent(getWeather.infoWindow);

  infowindow.open(map);

  // if (localStorage.getItem('access-token')) {
  //   map.event.addListener(infowindow, 'domready', async function (event) {
  //     const bookmarkButton = document.getElementById('bookmarkButton');
  //     const body = event.target.value;

  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         authorization: `Bearer ${access_token}`,
  //       },
  //       body,
  //     };

  //     let response = await fetch(`${APP_URL}/api/bookmarks/create`, options);
  //     response = await response.json();
  //     console.log(response);
  //   });
  // }
}

function initialize() {
  var initLatLng = { lat: 11, lng: 125 };
  var mapOptions = {
    zoom: 7,
    center: initLatLng,
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  infowindow = new google.maps.InfoWindow({
    content: 'Click the map to get Weather Info',
    position: initLatLng,
  });

  infowindow.open(map);
  // Add interaction listeners to make weather requests
  //google.maps.event.addListener(map, 'idle', checkIfDataRequested);

  // Sets up and populates the info window with details
  map.addListener('click', async function (event) {
    let { latLng } = event;
    let lat = latLng.lat();
    let lng = latLng.lng();

    setInfoWindow(lat, lng);
  });
}

var checkIfDataRequested = function () {
  // Stop extra requests being sent
  while (gettingData === true) {
    request.abort();
    gettingData = false;
  }
  getCoords();
};

// Get the coordinates from the Map bounds
var getCoords = function () {
  var bounds = map.getBounds();
  var NE = bounds.getNorthEast();
  var SW = bounds.getSouthWest();
  getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
};

// Make the weather request

// Take the JSON results and proccess them
var proccessResults = function () {
  console.log(this);
  var results = JSON.parse(this.responseText);
  if (results.list.length > 0) {
    resetData();
    for (var i = 0; i < results.list.length; i++) {
      geoJSON.features.push(jsonToGeoJson(results.list[i]));
    }
    drawIcons(geoJSON);
  }
};

// For each result that comes back, convert the data to geoJSON
var jsonToGeoJson = function (weatherItem) {
  var feature = {
    type: 'Feature',
    properties: {
      city: weatherItem.name,
      weather: weatherItem.weather[0].main,
      temperature: weatherItem.main.temp,
      min: weatherItem.main.temp_min,
      max: weatherItem.main.temp_max,
      humidity: weatherItem.main.humidity,
      pressure: weatherItem.main.pressure,
      windSpeed: weatherItem.wind.speed,
      windDegrees: weatherItem.wind.deg,
      windGust: weatherItem.wind.gust,
      icon:
        'http://openweathermap.org/img/w/' +
        weatherItem.weather[0].icon +
        '.png',
      coordinates: [weatherItem.coord.lon, weatherItem.coord.lat],
    },
    geometry: {
      type: 'Point',
      coordinates: [weatherItem.coord.lon, weatherItem.coord.lat],
    },
  };
  // Set the custom marker icon
  map.data.setStyle(function (feature) {
    return {
      icon: {
        url: feature.getProperty('icon'),
        anchor: new google.maps.Point(25, 25),
      },
    };
  });

  // returns object
  return feature;
};

// Add the markers to the map
var drawIcons = function (weather) {
  map.data.addGeoJson(geoJSON);
  // Set the flag to finished
  gettingData = false;
};

// Clear data layer and geoJSON
var resetData = function () {
  geoJSON = {
    type: 'FeatureCollection',
    features: [],
  };
  map.data.forEach(function (feature) {
    map.data.remove(feature);
  });
};
