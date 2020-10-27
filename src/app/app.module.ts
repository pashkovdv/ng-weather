import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './news/news.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: NewsComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
