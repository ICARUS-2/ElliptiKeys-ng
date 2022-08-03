import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  langSub: Subscription;

  constructor(private titleService: Title, private translateService: TranslateService) 
  {
    this.setTitle();

    this.langSub = this.translateService.onLangChange.subscribe( ()=>
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
    this.translateService.get("notFound.title").subscribe( str =>
      {
        this.titleService.setTitle(str);
      } )
  }
}
