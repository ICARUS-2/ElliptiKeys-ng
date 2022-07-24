import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeSelectorComponent } from './address-type-selector.component';

describe('AddressTypeSelectorComponent', () => {
  let component: AddressTypeSelectorComponent;
  let fixture: ComponentFixture<AddressTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressTypeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
