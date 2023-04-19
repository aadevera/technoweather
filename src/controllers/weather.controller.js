const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const NODE_ENV = process.env.NODE_ENV;
const fetch = require('node-fetch');

module.exports = {
  getWeatherByLatLon: async (req, res) => {
    const { lat, lon } = req.query;

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    //const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const result = await fetch(url);
    const data = await result.json();

    const { weather, main, name, coord } = data;
    const description = weather[0].description;
    const protocol = NODE_ENV === 'prod' ? 'https' : 'http';
    const icon = `${protocol}://openweathermap.org/img/wn/${weather[0].icon}.png`;

    let infoWindow = ` 
    <h6 style="margin:0">${name}</h6>
    <img src=${icon} >
    <br />
    ${description}
    <h6>${main.temp}&deg;C</h6>  
    `;

    const value = JSON.stringify({
      lat: coord.lat,
      lon: coord.lon,
    });

    if (req.session.user) {
      infoWindow =
        infoWindow +
        `<button class="btn btn-success btn-sm" id="bookmarkButton" onclick="createBookmark(this)" value=${value} type="button">Bookmark</button> `;
    }

    data.infoWindow = infoWindow;

    return data;
  },
};
