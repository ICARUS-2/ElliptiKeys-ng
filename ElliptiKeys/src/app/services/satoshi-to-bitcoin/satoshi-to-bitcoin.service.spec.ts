import { TestBed } from '@angular/core/testing';

import { SatoshiToBitcoinService } from './satoshi-to-bitcoin.service';

describe('SatoshiToBitcoinService', () => {
  let service: SatoshiToBitcoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatoshiToBitcoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
