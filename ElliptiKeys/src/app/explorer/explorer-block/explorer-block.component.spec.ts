import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerBlockComponent } from './explorer-block.component';

describe('ExplorerBlockComponent', () => {
  let component: ExplorerBlockComponent;
  let fixture: ComponentFixture<ExplorerBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
