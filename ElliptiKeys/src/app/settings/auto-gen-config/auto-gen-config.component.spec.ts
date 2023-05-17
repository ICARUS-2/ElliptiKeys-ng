import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenConfigComponent } from './auto-gen-config.component';

describe('AutoGenConfigComponent', () => {
  let component: AutoGenConfigComponent;
  let fixture: ComponentFixture<AutoGenConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoGenConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoGenConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
