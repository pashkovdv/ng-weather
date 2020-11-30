import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-multichart',
  templateUrl: './multichart.component.html',
  styleUrls: ['./multichart.component.css']
})
export class MultichartComponent implements OnInit {
  @Input() indicators: any[];
  @Input() defaultIndicators: string[];
  @Input() graphStyles: any[];
  @Input() weatherData: any[];
  @Input() timeShift: number;

  selectedIndicatorData: string[];
  selectedIndicatorStyle: 'line' | 'bar' = 'line';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlag = false;
    
  updateGraph = (currentIndicators, weatherData) => {
    const yAxis = [];
    const series = [];

    currentIndicators.forEach( (currentIndicator:any, index: number) => {
      const currentData = weatherData.map( (item:any) => item[currentIndicator.key] );
      const min = Math.min( ...currentData ) - 1;
      const max = Math.max( ...currentData ) + 1;
      const data = weatherData.map( (item:any) => ([
        this.timeShift + item.dt,
        item[currentIndicator.key]
      ]));

      yAxis.push({
        title: {
          text: currentIndicator.name + ', ' + currentIndicator.units
        },
        min,
        max
      });
      
      series.push({
        yAxis: index,
        name: currentIndicator.name,
        type: this.selectedIndicatorStyle,
        data: data,
      });
    });

    this.chartOptions = {
      title: { text: '' },
      xAxis: { type: 'datetime' },
      yAxis,
      series,
    };
    
    this.updateFlag = true;
  }

  ngOnChanges(changes) {
    if ( changes.weatherData.currentValue ){
      this.selectedIndicatorData = this.defaultIndicators;
      this.updateGraph(
        this.indicators.filter( (item:any) => this.defaultIndicators.includes(item.key) ),
        changes.weatherData.currentValue,
      );
    };
  }

  changeSelectedData = () => {
    const currentIndicators: any = this.indicators.filter( (item:any) => this.selectedIndicatorData.includes(item.key) );
    this.updateGraph(currentIndicators, this.weatherData);
  }

  changeStyle = (v:any) => {
    if ( v.isUserInput) {
      this.chartOptions.series = this.chartOptions.series.map( (item:any) => ({
        ...item,
        type: v.source.value,
      }));
      this.updateFlag = true;
    };
  }

  ngOnInit() {
  }

}

