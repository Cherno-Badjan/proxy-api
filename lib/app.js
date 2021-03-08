const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging
const { formatLocation, mungeWeather, mungeReview } = require('./munge-functions.js');


app.get('/location', async (req, res) => {
  try {

    const cityName = req.query.search;

    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.Location_Key}&q=${cityName}&format=json`);

    const fullResponse = response.body;

    const formattedResponse = formatLocation(fullResponse);

    res.json(formattedResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});
app.get('/weather', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.Weather_Key}`);

    const fullResponse = mungeWeather(response.body);



    res.json(fullResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});
app.get('/reviews', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const response = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
      .set('Authorization', `Bearer ${process.env.Yelp_Key}`)
      .set('Accept', 'application/json');

    const fullResponse = mungeReview(response.body);



    res.json(fullResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
