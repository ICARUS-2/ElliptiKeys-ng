import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import LocalStorageHelper from 'lib/localstorage-helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  hideUnusedKeysFormControl: FormControl;
  langSub: Subscription;

  constructor(private titleService: Title, private translateService: TranslateService) 
  {
    this.hideUnusedKeysFormControl = new FormControl(LocalStorageHelper.GetHideUnusedKeys())
  
    this.setTitle();

    this.langSub = this.translateService.onLangChange.subscribe( ()=>
    {
      this.setTitle();
    } )
  }

  ngOnInit(): void 
  {
  }

  ngOnDestroy(): void 
  {
    this.langSub.unsubscribe();  
  }

  onHideUnusedComponentRadioButtonChanged(event: any)
  {
    let val = event.target.value == "true"

    this.hideUnusedKeysFormControl.setValue(val)
    LocalStorageHelper.SetHideUnusedKeys(val)
  }

  setTitle(): void 
  {
    this.translateService.get("settings.title").subscribe( str =>
      {
        this.titleService.setTitle(str);
      } )
  }
}
