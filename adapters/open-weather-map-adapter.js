import { emptyWeatherObject } from './empty-weather-object.js';

export class OpenWeatherMapAdapter {
  constructor(openWeatherMapApiService) {
    this.openWeatherMapApiService = openWeatherMapApiService;
  }

  async getWeather(cityName) {
    try {
      const weather = await this.openWeatherMapApiService.getWeather(cityName);
      const {
        dt, name, sys: { country }, main: { temp, temp_min, temp_max },
        weather: [ { description, icon } ]
      } = weather;

      return {
        lastObservationTime: new Date(dt * 1000),
        location: {
          cityName: name,
          countryCode: country
        },
        weather: {
          currentTemperature: temp.toFixed(1),
          minTemperature: temp_min.toFixed(1),
          maxTemperature: temp_max.toFixed(1),
          units: 'C',
          description,
          iconUrl: this.openWeatherMapApiService.getIconUrl(icon)
        }
      };
    } catch (err) {
      console.log(err);
      return emptyWeatherObject;
    }
  }
}