import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleKeysetComponent } from './single-keyset.component';

describe('SingleKeysetComponent', () => {
  let component: SingleKeysetComponent;
  let fixture: ComponentFixture<SingleKeysetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleKeysetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleKeysetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
