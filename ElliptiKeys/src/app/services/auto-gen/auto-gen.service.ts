import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import PageHelper from './../../../../lib/page-helper';
import LocalStorageHelper from 'lib/localstorage-helper';
import { AUTO_GEN_PAGE_SELECTION_TYPES } from 'lib/dictionaries/page-selection-types';
import { AUTO_GEN_STOP_YELLOW } from 'lib/dictionaries/autogen-stop-types';

@Injectable({
  providedIn: 'root'
})
export class AutoGenService {

  autoModeActive: boolean = false;

  timeoutEvent: any;

  constructor(private router: Router) 
  {

  }

  navigateAfterDelay(isTestnet: boolean, pageNumber: BigInt)
  {
    let interval = PageHelper.DELAY;
    let networkUrl = isTestnet ? "testnet" : "bitcoin";

    this.timeoutEvent = setTimeout( () => 
    {
      if(!this.autoModeActive)
        return;

      let autoGenType = LocalStorageHelper.GetAutoGenPageSelectionType();

      if (autoGenType == AUTO_GEN_PAGE_SELECTION_TYPES.incrementing)
      {
        //@ts-ignore
        let nextPage = pageNumber == PageHelper.GetMaxPage() ? BigInt('1') : pageNumber + BigInt('1');
        
        this.router.navigate(["/" + networkUrl + "/" + nextPage]);
      }
      else if (autoGenType == AUTO_GEN_PAGE_SELECTION_TYPES.decrementing)
      {
        //@ts-ignore
        let prevPg = pageNumber == BigInt('1') ? PageHelper.GetMaxPage() : pageNumber - BigInt('1');
     
        this.router.navigate(["/" + networkUrl + "/" + prevPg]);
      }
      else
      {
        //If the user didn't set auto-gen to increment/decrement, it must be random
        if(isTestnet)
        {
          this.router.navigate(['/testnet-random'])
        }
        else
        {
          this.router.navigate(['/random'])
        }
      }
      

    }, interval)
  }

  toggleAutoGen(isTestnet: boolean, pageNumber: BigInt)
  {
    this.autoModeActive = !this.autoModeActive;

    if (this.autoModeActive)
    {
      this.navigateAfterDelay(isTestnet, pageNumber);
    }
    else
    {
      clearTimeout(this.timeoutEvent);
    }
  }

  cancel()
  {
    if (this.autoModeActive)
    {
      this.autoModeActive = false;
      clearTimeout(this.timeoutEvent)
    }
  }

  doesStopOnYellow() : boolean
  {
    return LocalStorageHelper.GetStopAutoGenOnYellow() == AUTO_GEN_STOP_YELLOW.yes;
  }

  getSelectionMode() : string
  {
    return LocalStorageHelper.GetAutoGenPageSelectionType();
  }
}
