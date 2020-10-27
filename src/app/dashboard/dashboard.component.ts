import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Fruit Consumption'
    },
    subtitle: {
      text: 'My custom subtitle'
    },
    yAxis: {
      title: {
          text: 'Fruit eaten'
      }
    },
    type: 'line',
    series: [{
      data: [1, 2, 3],
      name: 'Jane',
      color: '#66ff66'
    },{
      data: [0, 6, 10],
      name: 'John',
      color: '#ff6666'
    }],
    responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                enabled: false  
              }
          }
      }]
  }
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit(): void {
  }

}
