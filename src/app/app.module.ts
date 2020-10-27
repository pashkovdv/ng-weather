import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsComponent,
    NotFoundComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: NewsComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'chart', component: ChartComponent},
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404'},
    ]),
    HighchartsChartModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
