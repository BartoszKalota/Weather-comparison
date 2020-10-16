import express from 'express';

import ENVS from '../config.js';

import { OpenWeatherMapAdapter } from '../adapters/open-weather-map-adapter.js';
import { WeatherBitAdapter } from '../adapters/weather-bit-adapter.js';
import { AccuWeatherAdapter } from '../adapters/accu-weather-adapter.js';
import { OpenWeatherMapApiService, OpenWeatherMapMockService } from '../api-services/open-weather-map-api-service.js';
import { WeatherBitApiService, WeatherBitMockService } from '../api-services/weather-bit-api-service.js';
import { AccuWeatherApiService, AccuWeatherMockService } from '../api-services/accu-weather-api-service.js';

const {
  WEATHER_BIT_MOCK, WEATHER_BIT_ICON_BASE_URL, WEATHER_BIT_API_BASE_URL, WEATHER_BIT_API_KEY,
  OPEN_WEATHER_MAP_MOCK, OPEN_WEATHER_MAP_ICON_BASE_URL, OPEN_WEATHER_MAP_API_BASE_URL, OPEN_WEATHER_MAP_API_KEY,
  ACCU_WEATHER_MOCK, ACCU_WEATHER_ICON_BASE_URL, ACCU_WEATHER_API_BASE_URL, ACCU_WEATHER_API_KEY
} = ENVS;

export const router = express.Router();

/*
 By default all APIs will respond with hardcoded json mock data. Set each API to false in order to use real endpoint. 
 Beware of requet number limits per day.
 */

const weatherBitService = WEATHER_BIT_MOCK === 'true'
  ? new WeatherBitMockService()
  : new WeatherBitApiService(
      WEATHER_BIT_ICON_BASE_URL,
      WEATHER_BIT_API_BASE_URL,
      WEATHER_BIT_API_KEY
    );

const openWeatherService = OPEN_WEATHER_MAP_MOCK === 'true'
  ? new OpenWeatherMapMockService()
  : new OpenWeatherMapApiService(
      OPEN_WEATHER_MAP_ICON_BASE_URL,
      OPEN_WEATHER_MAP_API_BASE_URL,
      OPEN_WEATHER_MAP_API_KEY
    );

const accuWeatherService = ACCU_WEATHER_MOCK === 'true'
  ? new AccuWeatherMockService()
  : new AccuWeatherApiService(
      ACCU_WEATHER_ICON_BASE_URL,
      ACCU_WEATHER_API_BASE_URL,
      ACCU_WEATHER_API_KEY
    );

const weatherBitAdapter = new WeatherBitAdapter(weatherBitService);
const openWeatherMapAdapter = new OpenWeatherMapAdapter(openWeatherService);
const accuWeatherAdapter = new AccuWeatherAdapter(accuWeatherService);

router.get('/', async (req, res) => {
  const rawParam = req.query.city;  // query 'weather/?city=...' comes from front-end
  const locationSearch = rawParam
    .trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "");  // removes accents and diacritics
  const [ weatherBit, openWeatherMap, accuWeather ] = await Promise.all([
    weatherBitAdapter.getWeather(locationSearch),
    openWeatherMapAdapter.getWeather(locationSearch),
    accuWeatherAdapter.getWeather(locationSearch)
  ]);
  res.json({ weatherBit, openWeatherMap, accuWeather });
});