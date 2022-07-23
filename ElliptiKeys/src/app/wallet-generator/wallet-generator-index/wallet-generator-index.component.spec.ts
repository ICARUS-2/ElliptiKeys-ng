import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletGeneratorIndexComponent } from './wallet-generator-index.component';

describe('WalletGeneratorIndexComponent', () => {
  let component: WalletGeneratorIndexComponent;
  let fixture: ComponentFixture<WalletGeneratorIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletGeneratorIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletGeneratorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
