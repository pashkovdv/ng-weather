import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherData = {};

  constructor(
    private http: HttpClient,
  ) { }

  getWeatherData() {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?id=509820&lang=ru&appid=fe57b721fd47b8600afac45a7829c1ea');
  }
}
