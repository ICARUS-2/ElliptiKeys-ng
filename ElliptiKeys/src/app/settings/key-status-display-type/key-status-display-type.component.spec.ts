import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyStatusDisplayTypeComponent } from './key-status-display-type.component';

describe('KeyStatusDisplayTypeComponent', () => {
  let component: KeyStatusDisplayTypeComponent;
  let fixture: ComponentFixture<KeyStatusDisplayTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyStatusDisplayTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyStatusDisplayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
