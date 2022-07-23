import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkGenerateComponent } from './bulk-generate.component';

describe('BulkGenerateComponent', () => {
  let component: BulkGenerateComponent;
  let fixture: ComponentFixture<BulkGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
