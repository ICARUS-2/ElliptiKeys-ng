import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnemonicComponent } from './mnemonic.component';

describe('MnemonicComponent', () => {
  let component: MnemonicComponent;
  let fixture: ComponentFixture<MnemonicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnemonicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnemonicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
