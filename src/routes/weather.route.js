const { weatherController } = require('src/controllers');
const router = require('express').Router();

router.get('/getweather', async (req, res) => {
  const response = await weatherController.getWeatherByLatLon(req, res);
  return res.json(response);
});

module.exports = router;
