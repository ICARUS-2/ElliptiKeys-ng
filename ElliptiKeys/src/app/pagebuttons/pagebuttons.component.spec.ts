import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebuttonsComponent } from './pagebuttons.component';

describe('PagebuttonsComponent', () => {
  let component: PagebuttonsComponent;
  let fixture: ComponentFixture<PagebuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagebuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagebuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
