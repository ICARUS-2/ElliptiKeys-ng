import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-too-far',
  templateUrl: './too-far.component.html',
  styleUrls: ['./too-far.component.css']
})
export class TooFarComponent implements OnInit, OnDestroy {

  langSub: Subscription;

  constructor(private titleService: Title, private translateService: TranslateService) 
  {
    this.setTitle();
    
    this.langSub = this.translateService.onLangChange.subscribe( () =>
    {
      this.setTitle();
    } )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  setTitle()
  {
    this.translateService.get("tooFar.title").subscribe( str =>
      {
        this.titleService.setTitle(str);
      } )
  }
}
