import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooFarComponent } from './too-far.component';

describe('TooFarComponent', () => {
  let component: TooFarComponent;
  let fixture: ComponentFixture<TooFarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooFarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooFarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
