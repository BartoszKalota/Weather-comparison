import express from 'express';
import { router as mocks } from './routes/weather-mocks.js';
// import { router as weather } from './routes/weather.js';
import ENVS from './config.js';

const app = express();

// app.use(express.static('weather'));

app.use('/mocks', mocks);
// app.use('/weather', weather);

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(ENVS.PORT, () => {
  console.log(`Listening on port ${ENVS.PORT}...`);
});