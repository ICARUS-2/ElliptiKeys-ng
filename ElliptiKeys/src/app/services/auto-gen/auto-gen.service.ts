import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import PageHelper from './../../../../lib/page-helper';
import LocalStorageHelper from 'lib/localstorage-helper';

@Injectable({
  providedIn: 'root'
})
export class AutoGenService {

  autoModeActive: boolean = false;

  timeoutEvent: any;

  constructor(private router: Router) 
  {

  }

  navigateAfterDelay(isTestnet: boolean)
  {
    let interval = PageHelper.DELAY;

    this.timeoutEvent = setTimeout( () => 
    {
      if(!this.autoModeActive)
        return;
    
      
      if(isTestnet)
      {
        this.router.navigate(['/testnet-random'])
      }
      else
      {
        this.router.navigate(['/random'])
      }
      

    }, interval)
  }

  toggleAutoGen(isTestnet: boolean)
  {
    this.autoModeActive = !this.autoModeActive;

    if (this.autoModeActive)
    {
      this.navigateAfterDelay(isTestnet);
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
    return LocalStorageHelper.GetStopAutoGenOnYellow();
  }
}
