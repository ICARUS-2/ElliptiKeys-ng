import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnetRandomComponent } from './testnet-random.component';

describe('TestnetRandomComponent', () => {
  let component: TestnetRandomComponent;
  let fixture: ComponentFixture<TestnetRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestnetRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestnetRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
