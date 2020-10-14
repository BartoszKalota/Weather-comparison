import fetch from 'node-fetch';

export class AccuWeatherApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Returns location information for given city search
   * @param {string} cityName
   */
  async getLocation(cityName) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/locations/v1/cities/search?apikey=${this.apiKey}&q=${cityName}`);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Returns current weather conditions for given location
   * @param {string} locationId - retuned from @getLocation API request
   */
  async getCurrentConditions(locationId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/currentconditions/v1/${locationId}?apikey=${this.apiKey}`);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Returns such information as minimum and maximum temperature forecast
   * @param {string} locationId - returned from @getLocation API request
   */
  async getDailyForecast(locationId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/forecasts/v1/daily/1day/${locationId}?apikey=${this.apiKey}&metric=true`);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  getIconUrl(iconCode) {
    if (!iconCode) {
      return null;
    }

    const fullIconCode = iconCode.toString().padStart(2, '0');
    return `${this.iconsBaseUrl}/${fullIconCode}-s.png`;
  }
}

export class AccuWeatherMockService {
  async getCurrentConditions() {
    try {
      const response = await fetch('http://localhost:3000/mocks/accuweather-current');
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getDailyForecast() {
    try {
      const response = await fetch('http://localhost:3000/mocks/accuweather-daily');
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getLocation() {
    try {
      const response = await fetch('http://localhost:3000/mocks/accuweather-location');
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  getIconUrl(iconCode) {
    const fullIconCode = iconCode.toString().padStart(2, '0');
    return iconCode
      ? `https://developer.accuweather.com/sites/default/files/${fullIconCode}-s.png`
      : null;
  }
}