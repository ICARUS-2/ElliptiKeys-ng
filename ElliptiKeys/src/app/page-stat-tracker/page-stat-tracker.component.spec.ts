import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStatTrackerComponent } from './page-stat-tracker.component';

describe('PageStatTrackerComponent', () => {
  let component: PageStatTrackerComponent;
  let fixture: ComponentFixture<PageStatTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStatTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageStatTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
