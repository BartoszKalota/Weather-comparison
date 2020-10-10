import fetch from 'node-fetch';

export class WeatherBitApiService {
  constructor(iconsBaseUrl, apiBaseUrl, apiKey) {
    this.iconsBaseUrl = iconsBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;
  }

  async getCurrent(cityName) {
    try {
      const response = await fetch(`${this.apiBaseUrl}?key=${this.apiKey}&city=${cityName}`);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  getIconUrl(iconCode) {
    return iconCode ? `${this.iconsBaseUrl}/${iconCode}.png` : null;
  }
}

export class WeatherBitMockService {
  async getCurrent() {
    const response = await fetch('http://localhost:3000/mocks/weatherbit-current');
    return response.json();
  }

  getIconUrl(iconCode) {
    return iconCode
      ? `https://weatherbit.io/static/img/icons/${iconCode}.png`
      : null;
  }
}