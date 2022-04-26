import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyrowComponent } from './keyrow.component';

describe('KeyrowComponent', () => {
  let component: KeyrowComponent;
  let fixture: ComponentFixture<KeyrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
