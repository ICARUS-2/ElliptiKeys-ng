import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerAddressComponent } from './explorer-address.component';

describe('ExplorerAddressComponent', () => {
  let component: ExplorerAddressComponent;
  let fixture: ComponentFixture<ExplorerAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
