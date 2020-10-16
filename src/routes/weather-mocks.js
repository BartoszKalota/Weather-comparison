import express from 'express';
import { getDataFromFile } from '../utils/utils.js';

export const router = express.Router();

router.get('/weatherbit-current', async (req, res, next) => {
  try {
    const data = await getDataFromFile('weatherbit_current.json');
    res.json(data);
  } catch (err) {
    next(err)
  }
});

router.get('/openweathermap-current', async (req, res, next) => {
  try {
    const data = await getDataFromFile('openweathermap_current.json');
    res.json(data);
  } catch (err) {
    next(err)
  }
});

router.get('/accuweather-current', async (req, res, next) => {
  try {
    const data = await getDataFromFile('accuweather_current.json');
    res.json(data);
  } catch (err) {
    next(err)
  }
});

router.get('/accuweather-location', async (req, res, next) => {
  try {
    const data = await getDataFromFile('accuweather_location.json');
    res.json(data);
  } catch (err) {
    next(err)
  }
});

router.get('/accuweather-daily', async (req, res, next) => {
  try {
    const data = await getDataFromFile('accuweather_daily.json');
    res.json(data);
  } catch (err) {
    next(err)
  }
});