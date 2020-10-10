import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  
  OPEN_WEATHER_MAP_MOCK: process.env.OPEN_WEATHER_MAP_MOCK,
  OPEN_WEATHER_MAP_ICON_BASE_URL: process.env.OPEN_WEATHER_MAP_ICON_BASE_URL,
  OPEN_WEATHER_MAP_API_BASE_URL: process.env.OPEN_WEATHER_MAP_API_BASE_URL,
  OPEN_WEATHER_MAP_API_KEY: process.env.OPEN_WEATHER_MAP_API_KEY,
  
  WEATHER_BIT_MOCK: process.env.WEATHER_BIT_MOCK,
  WEATHER_BIT_ICON_BASE_URL: process.env.WEATHER_BIT_ICON_BASE_URL,
  WEATHER_BIT_API_BASE_URL: process.env.WEATHER_BIT_API_BASE_URL,
  WEATHER_BIT_API_KEY: process.env.WEATHER_BIT_API_KEY,

  ACCU_WEATHER_MOCK: process.env.ACCU_WEATHER_MOCK,
  ACCU_WEATHER_ICON_BASE_URL: process.env.ACCU_WEATHER_ICON_BASE_URL,
  ACCU_WEATHER_API_BASE_URL: process.env.ACCU_WEATHER_API_BASE_URL,
  ACCU_WEATHER_API_KEY: process.env.ACCU_WEATHER_API_KEY
}