import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { WeatherService } from '../weather.service';

export type rangeDateType = 'startDate'|'endDate';

type indicatorsType = {
  key: string,
  name: string,
  units: string,
};

const indicators: indicatorsType[] = [
  {key: 'temp', name: 'Температура воздуха', units: '°C'},
  {key: 'humidity', name: 'Относительная влажность', units: '%'},
  {key: 'cloudsPercent', name: 'Облачность', units: '%'},
  {key: 'windSpeed', name: 'Скорость ветра', units: 'м/с'},
  {key: 'pressure', name: 'Давление', units: 'мм р.с.'},
  {key: 'visibility', name: 'Видимость', units: 'м'},
];

type graphStylesType = {
  key: string,
  name: string,
};

const graphStyles: graphStylesType[] = [
  {key: 'line', name: 'Линия'},
  {key: 'bar', name: 'Свечи'},
];

type colorsType = {
  key: string,
  name: string,
};

const colors: colorsType[] = [
  {key: 'red', name: 'Красный'},
  {key: 'orange', name: 'Оранжевый'},
  {key: 'yellow', name: 'Желтый'},
  {key: 'green', name: 'Зеленый'},
  {key: 'blue', name: 'Голубой'},
  {key: 'violet', name: 'Фиолетовый'},
  {key: 'pink', name: 'Розовый'},
  {key: 'grey', name: 'Серый'},
  {key: 'black', name: 'Черный'},
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weatherData: any[];
  city: string;
  startDate: Date = moment().startOf('day').toDate();
  endDate: Date = moment().add(10, 'days').endOf('day').toDate();
  indicators: indicatorsType[] = indicators;
  graphStyles: graphStylesType[] = graphStyles;
  colors: colorsType[] = colors;
  timeShift: number = 1000*60*60*3;

  constructor(
    private weatherService: WeatherService
  ) {
    this.getWaetherData();
  }

  ngOnInit(): void {}

  getWaetherData = () => this.weatherService.getWeatherData().subscribe((data:any) => {
    this.city = data.city.name;

    this.weatherData = data.list.map( (item:any) => ({
      dt: ( item.dt - data.city.timezone ) * 1000,
      temp: Math.floor( 10 * ( item.main.temp - 273.15 )) / 10,
      humidity: item.main.humidity,
      cloudsPercent: item.clouds.all,
      windSpeed: item.wind.speed,
      pressure: Math.floor( item.main.pressure / 1.3332 ),
      visibility: item.visibility,
    }));

    this.weatherData = this.weatherData.filter( (item:any) =>
      new Date(item.dt) >= this.startDate && new Date(item.dt) <= this.endDate
    );
  });

  onNotifyChangeRange = (n: {dateType: rangeDateType, date: Date}) => {
    this[n.dateType] = n.date;
    this.getWaetherData();
  }
}
