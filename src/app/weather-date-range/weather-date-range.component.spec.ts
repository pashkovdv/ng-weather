import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDateRangeComponent } from './weather-date-range.component';

describe('WeatherDateRangeComponent', () => {
  let component: WeatherDateRangeComponent;
  let fixture: ComponentFixture<WeatherDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDateRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
