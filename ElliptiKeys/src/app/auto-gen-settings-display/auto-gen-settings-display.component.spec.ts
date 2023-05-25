import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenSettingsDisplayComponent } from './auto-gen-settings-display.component';

describe('AutoGenSettingsDisplayComponent', () => {
  let component: AutoGenSettingsDisplayComponent;
  let fixture: ComponentFixture<AutoGenSettingsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoGenSettingsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoGenSettingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
