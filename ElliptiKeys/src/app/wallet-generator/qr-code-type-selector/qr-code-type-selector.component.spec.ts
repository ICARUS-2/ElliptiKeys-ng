import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeTypeSelectorComponent } from './qr-code-type-selector.component';

describe('QrCodeTypeSelectorComponent', () => {
  let component: QrCodeTypeSelectorComponent;
  let fixture: ComponentFixture<QrCodeTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeTypeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
