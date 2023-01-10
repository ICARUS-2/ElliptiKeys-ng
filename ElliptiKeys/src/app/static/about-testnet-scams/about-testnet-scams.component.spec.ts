import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTestnetScamsComponent } from './about-testnet-scams.component';

describe('AboutTestnetScamsComponent', () => {
  let component: AboutTestnetScamsComponent;
  let fixture: ComponentFixture<AboutTestnetScamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTestnetScamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTestnetScamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
