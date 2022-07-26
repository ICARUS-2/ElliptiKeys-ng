import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenComponent } from './auto-gen.component';

describe('AutoGenComponent', () => {
  let component: AutoGenComponent;
  let fixture: ComponentFixture<AutoGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoGenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
