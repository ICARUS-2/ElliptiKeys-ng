import { Injectable } from '@angular/core';
import LocalStorageHelper from 'lib/localstorage-helper';

@Injectable({
  providedIn: 'root'
})

export class PriceService {
  static CALL_DELAY = 60;
  static API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"

  constructor() { 
    
  }

  async getPrice() : Promise<object>
  {
    if (this._CanCallApi())
    {
      try
      {
        let price = await this._FetchPrice()
        //console.log("REAL TIME PRICE CALLED")

        LocalStorageHelper.SetLastPriceApiCall(Date.now())
        LocalStorageHelper.SetLastRecordedPrice(price)
        return price;
      }
      catch(err)
      {
        if (LocalStorageHelper.GetLastRecordedPrice())
        {
          return LocalStorageHelper.GetLastRecordedPrice();
        }
        else
          return {};
      }
    }

    return LocalStorageHelper.GetLastRecordedPrice();
  }

  btcToUsd(btcAmnt: number | undefined)
  {
    if (btcAmnt == undefined)
      return "<invalid amount>"

    try
    {
      let lastRecorded = LocalStorageHelper.GetLastRecordedPrice()["bitcoin"]["usd"];
      return (lastRecorded * btcAmnt).toFixed(2);
    }
    catch(err)
    {
      return "<price unavailable>"
    }
  }

  async _FetchPrice()
  {
    let price = await fetch(PriceService.API)

    let j = await price.json()

    return j
  }

  _CanCallApi() : boolean
  {
    if (window.location.href.includes('/random'))
      return false;

    let lastCallStored: string|null = LocalStorageHelper.GetLastPriceApiCall();
    
    if (lastCallStored)
    {
      let lastCallDate = Number(lastCallStored)
      let now = Date.now()

      let delay = (now - lastCallDate) / 1000

      //console.log(delay)

      return delay >= PriceService.CALL_DELAY;
    }
    
    return true;
  }
}
