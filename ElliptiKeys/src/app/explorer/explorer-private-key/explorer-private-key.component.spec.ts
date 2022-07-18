import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerPrivateKeyComponent } from './explorer-private-key.component';

describe('ExplorerPrivateKeyComponent', () => {
  let component: ExplorerPrivateKeyComponent;
  let fixture: ComponentFixture<ExplorerPrivateKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerPrivateKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerPrivateKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
