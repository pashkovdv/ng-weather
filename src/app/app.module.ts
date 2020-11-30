import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChartComponent } from './chart/chart.component';
import { WeatherDateRangeComponent } from './weather-date-range/weather-date-range.component';
import { MultichartComponent } from './multichart/multichart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsComponent,
    NotFoundComponent,
    ChartComponent,
    WeatherDateRangeComponent,
    MultichartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: NewsComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404'},
    ]),
    HighchartsChartModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,    //added here too
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
