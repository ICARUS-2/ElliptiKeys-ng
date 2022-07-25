import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnemonicWordCountSelectorComponent } from './mnemonic-word-count-selector.component';

describe('MnemonicWordCountSelectorComponent', () => {
  let component: MnemonicWordCountSelectorComponent;
  let fixture: ComponentFixture<MnemonicWordCountSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnemonicWordCountSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnemonicWordCountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
