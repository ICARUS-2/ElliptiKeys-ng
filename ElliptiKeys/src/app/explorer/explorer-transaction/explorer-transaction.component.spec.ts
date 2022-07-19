import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerTransactionComponent } from './explorer-transaction.component';

describe('ExplorerTransactionComponent', () => {
  let component: ExplorerTransactionComponent;
  let fixture: ComponentFixture<ExplorerTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
