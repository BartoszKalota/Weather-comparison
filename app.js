import express from 'express';
import expressRateLimit from 'express-rate-limit';
import { router as mocks } from './routes/weather-mocks.js';
import { router as weather } from './routes/weather.js';
import ENVS from './config.js';

const app = express();

// Limit for 100 requests per day
app.use(expressRateLimit({
  windowMs: (1000 * 60 * 60 * 24),
  max: 100
}));

// Front-end
app.use(express.static('weather'));

// Routers
app.use('/mocks', mocks);
app.use('/weather', weather);

// Error handler
app.use((err, req, res, next) => {
  res.send(err.message);
});

// Page 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

app.listen(ENVS.PORT, () => {
  console.log(`Listening on port ${ENVS.PORT}...`);
});