import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SatoshiToBitcoinService {

  static DIVISOR = 100000000
  constructor() { 

  }

  get(satoshis: number | undefined)
  {
    if (satoshis == undefined)
      return 0;

    return (satoshis / SatoshiToBitcoinService.DIVISOR).toFixed(8);
  }
}
