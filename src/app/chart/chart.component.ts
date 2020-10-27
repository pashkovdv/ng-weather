import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  weatherData;
  city;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options;
  updateFlag: boolean = false;

  constructor(
    private weatherService: WeatherService
  ) {
    this.weatherService.getWeatherData().subscribe((data:any) => {
      this.city = data.city.name;
      this.weatherData = data.list.map( (item:any) => ({
        dt: new Date(( item.dt - data.city.timezone ) * 1000 ),
        dt_txt: item.dt_txt,
        cloudsPercent: item.clouds.all,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        temp: item.main.temp - 273.15,
        visibility: item.visibility,
        windSpeed: item.wind.speed,
      }));

      console.log("ChartComponent -> this.weatherData ", this.weatherData )
      this.chartOptions = {
        title: {
          text: 'Fruit Consumption'
        },
        subtitle: {
          text: 'My custom subtitle'
        },
        yAxis: [{ // Primary yAxis
          min: 1000,
          labels: {
              format: '{value} hPa',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          min: 99,
          title: {
              text: 'Rainfall',
          },
          labels: {
              format: '{value} °C',
          },
          //opposite: true
      }],
        series: [
          {
          data: this.weatherData.map( (item: any)  => item.temp+100 ),
          yAxis: 1,
          type: 'spline',
          name: 'Jane',
          color: '#66ff66'
        },{
          data: this.weatherData.map( (item: any)  => item.pressure ),
          name: 'John',
          type: 'spline',
          color: '#ff6666'
        }],
        responsive: {
          rules: [{
              condition: {
                  maxWidth: 500,
              },
              chartOptions: {
                  legend: {
                    enabled: false,
                  },
              },
          }],
        },
      };

    });

    
  }

  ngOnInit(): void {
  }

}
