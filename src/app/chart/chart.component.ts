import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() indicators: any[];
  @Input() defaultIndicator: string;
  @Input() graphStyles: any[];
  @Input() colors: any[];
  @Input() selectedColor: string;
  @Input() weatherData: any[];
  @Input() timeShift: number;

  selectedIndicatorData: string;
  selectedIndicatorStyle: 'line' | 'bar' = 'line';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: '' },
    series: [
      { type: this.selectedIndicatorStyle }
    ],
  };
  updateFlag = false;
    
  updateGraph = (currentIndicator, weatherData) => {
    const currentData = weatherData.map( (item:any) => item[currentIndicator.key] );
    const min = Math.min( ...currentData ) - 1;
    const max = Math.max( ...currentData ) + 1;
    const data = weatherData.map( (item:any) => ([
      this.timeShift + item.dt,
      item[currentIndicator.key]
    ]));

    this.chartOptions = {
      xAxis: { type: 'datetime' },
      yAxis: {
        title: {
          text: currentIndicator.name + ', ' + currentIndicator.units
        },
        min,
        max
      },
      series: [{
        name: currentIndicator.name,
        type: this.selectedIndicatorStyle,
        data: data,
        color: this.selectedColor,
      }]
    };
    
    this.updateFlag = true;
  }

  ngOnChanges(changes) {
    if ( changes.weatherData.currentValue ){
      this.selectedIndicatorData = this.defaultIndicator;
      this.updateGraph(
        this.indicators.find( (item:any) => item.key === this.defaultIndicator ),
        changes.weatherData.currentValue,
      );
    };
  }

  changeData = (v:any) => {
    if ( v.isUserInput) {
      const currentIndicator: any = this.indicators.find( (item:any) => item.key === v.source.value );
      this.updateGraph(currentIndicator, this.weatherData);
    };
  }

  changeStyle = (v:any) => {
    if ( v.isUserInput) {
      this.chartOptions.series[0].type = v.source.value;
      this.updateFlag = true;
    };
  }

  changeColor = (v:any) => {
    if ( v.isUserInput) {
      this.chartOptions.series[0].color = v.source.value;
      this.updateFlag = true;
    };
  }

  ngOnInit() {
  }

}
