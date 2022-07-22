import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerIndexComponent } from './explorer-index.component';

describe('ExplorerIndexComponent', () => {
  let component: ExplorerIndexComponent;
  let fixture: ComponentFixture<ExplorerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
