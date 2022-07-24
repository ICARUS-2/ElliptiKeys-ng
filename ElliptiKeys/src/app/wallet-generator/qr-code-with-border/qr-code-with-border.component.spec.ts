import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeWithBorderComponent } from './qr-code-with-border.component';

describe('QrCodeWithBorderComponent', () => {
  let component: QrCodeWithBorderComponent;
  let fixture: ComponentFixture<QrCodeWithBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeWithBorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeWithBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
