import moment from 'moment-timezone';

import { emptyWeatherObject } from './empty-weather-object.js';

export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
    try {
      const current = await this.weatherBitApiService.getCurrent(cityName);
      const {
        ob_time, timezone, city_name, country_code,
        temp, weather: { description, icon }
      } = current.data[0]

      return {
        lastObervationTime: new Date(moment.tz(ob_time, timezone).format()),
        location: {
          cityName: city_name,
          countryCode: country_code
        },
        weather: {
          currentTemperature: temp,
          minTemperature: null,  // was not provided
          maxTemperature: null,  // was not provided
          units: 'C',
          description,
          iconUrl: weatherBitApiService.getIconUrl(icon)
        }
      };
    } catch (err) {
      console.log(err);
      return emptyWeatherObject;
    }
  }
}