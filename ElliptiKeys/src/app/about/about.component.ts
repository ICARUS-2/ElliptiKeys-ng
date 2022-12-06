import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import AppData from './../../../lib/app-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  langSub: Subscription

  constructor(private titleService: Title, private translateService: TranslateService) {
    
    this.setTitle();
    
    this.langSub = this.translateService.onLangChange.subscribe( () =>
    {
      this.setTitle()
    } )
   }
   
  ngOnInit(): void {

  }  

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  setTitle()
  {
    this.translateService.get( "about.title" ).subscribe( str =>
      {
        this.titleService.setTitle(str);
      } )
  }
  
  getVersion(): string
  {
    return AppData.version;
  }
}
