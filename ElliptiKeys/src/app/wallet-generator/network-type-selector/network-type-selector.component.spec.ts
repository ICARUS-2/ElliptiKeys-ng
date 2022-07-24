import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkTypeSelectorComponent } from './network-type-selector.component';

describe('NetworkTypeSelectorComponent', () => {
  let component: NetworkTypeSelectorComponent;
  let fixture: ComponentFixture<NetworkTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkTypeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
