import { TestBed } from '@angular/core/testing';

import { AutoGenService } from './auto-gen.service';

describe('AutoGenService', () => {
  let service: AutoGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
