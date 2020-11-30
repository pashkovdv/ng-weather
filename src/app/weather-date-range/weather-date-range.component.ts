import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { rangeDateType } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-weather-date-range',
  templateUrl: './weather-date-range.component.html',
  styleUrls: ['./weather-date-range.component.css']
})
export class WeatherDateRangeComponent implements OnInit {
  @Output() notifyDashboard = new EventEmitter();

  minDate: Date;
  maxDate: Date;
  range: FormGroup;

  constructor() {
    const minDate = moment().startOf('day').toDate();
    const maxDate = moment().add(40*3, 'hours').endOf('day').toDate();
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.range = new FormGroup({
      start: new FormControl(minDate),
      end: new FormControl(maxDate)
    });
  }

  ngOnInit(): void {
  }

  onDateChange(dateType: rangeDateType, event: MatDatepickerInputEvent<Date>) {
    this.notifyDashboard.emit({
      dateType,
      date: dateType === 'endDate' ? moment(event.value).endOf('day').toDate() : event.value,
    });
  }
}
