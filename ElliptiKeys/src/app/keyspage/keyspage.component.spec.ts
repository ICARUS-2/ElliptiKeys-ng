import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyspageComponent } from './keyspage.component';

describe('KeyspageComponent', () => {
  let component: KeyspageComponent;
  let fixture: ComponentFixture<KeyspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
