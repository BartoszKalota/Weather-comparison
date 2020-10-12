import { emptyWeatherObject } from './empty-weather-object.js';

export class AccuWeatherAdapter {
  constructor(accuWeatherApiService) {
    this.accuWeatherApiService = accuWeatherApiService;
  }

  async getWeather(cityName) {
    try {
      const {
        getLocation, getCurrentConditions, getDailyForecast, getIconUrl
      } = this.accuWeatherApiService;
      const [ location ] = await getLocation(cityName);
      const [ [ current ], daily ] = await Promise.all([
        getCurrentConditions(location.Key),
        getDailyForecast(location.Key)
      ]);

      const {
        LocalizedName, Country: { ID }
      } = location;
      const {
        LocalObservationDateTime, Temperature: { Metric: { Value } }, WeatherText, WeatherIcon
      } = current;
      const { 
        DailyForecasts: [ { Temperature: { Minimum, Maximum } } ]
      } = daily;

      return {
        lastObservationTime: new Date(LocalObservationDateTime),
        location: {
          cityName: LocalizedName,
          countryCode: ID
        },
        weather: {
          currentTemperature: Value.toFixed(1),
          minTemperature: Minimum.Value.toFixed(1),
          maxTemperature: Maximum.Value.toFixed(1),
          units: 'C',
          description: WeatherText,
          iconUrl: getIconUrl(WeatherIcon)
        }
      };
    } catch (err) {
      console.log(err);
      return emptyWeatherObject;
    }
  }
}