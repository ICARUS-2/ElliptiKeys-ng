import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerTransactionListComponent } from './explorer-transaction-list.component';

describe('ExplorerTransactionListComponent', () => {
  let component: ExplorerTransactionListComponent;
  let fixture: ComponentFixture<ExplorerTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerTransactionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
