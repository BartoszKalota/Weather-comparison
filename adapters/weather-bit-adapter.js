import moment from 'moment-timezone';

import { emptyWeatherObject } from './empty-weather-object.js';

export class WeatherBitAdapter {
  constructor(weatherBitApiService) {
    this.weatherBitApiService = weatherBitApiService;
  }

  async getWeather(cityName) {
    try {
      const weather = await this.weatherBitApiService.getWeather(cityName);
      const {
        ob_time, timezone, city_name, country_code,
        temp, weather: { description, icon }
      } = weather.data[0]

      return {
        lastObservationTime: new Date(moment.tz(ob_time, timezone).format()),
        location: {
          cityName: city_name,
          countryCode: country_code
        },
        weather: {
          currentTemperature: temp,
          minTemperature: undefined,  // was not provided
          maxTemperature: undefined,  // was not provided
          units: 'C',
          description,
          iconUrl: this.weatherBitApiService.getIconUrl(icon)
        }
      };
    } catch (err) {
      console.log(err);
      return emptyWeatherObject;
    }
  }
}