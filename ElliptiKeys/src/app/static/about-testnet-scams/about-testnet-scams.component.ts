import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-testnet-scams',
  templateUrl: './about-testnet-scams.component.html',
  styleUrls: ['./about-testnet-scams.component.css']
})
export class AboutTestnetScamsComponent implements OnInit, OnDestroy {

  langSub: Subscription;

  constructor(private titleService: Title, private translateService: TranslateService) 
  {
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

  setTitle(): void 
  {
    this.translateService.get("aboutTestnetScams.title").subscribe( str =>
      {
        this.titleService.setTitle(str);
      } )
  }
}
