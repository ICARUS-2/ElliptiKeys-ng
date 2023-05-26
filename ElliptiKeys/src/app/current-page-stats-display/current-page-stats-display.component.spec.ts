import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPageStatsDisplayComponent } from './current-page-stats-display.component';

describe('CurrentPageStatsDisplayComponent', () => {
  let component: CurrentPageStatsDisplayComponent;
  let fixture: ComponentFixture<CurrentPageStatsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPageStatsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentPageStatsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
