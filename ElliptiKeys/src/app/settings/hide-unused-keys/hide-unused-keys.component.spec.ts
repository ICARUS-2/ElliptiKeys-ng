import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideUnusedKeysComponent } from './hide-unused-keys.component';

describe('HideUnusedKeysComponent', () => {
  let component: HideUnusedKeysComponent;
  let fixture: ComponentFixture<HideUnusedKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HideUnusedKeysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HideUnusedKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
