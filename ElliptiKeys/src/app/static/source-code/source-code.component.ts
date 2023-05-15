import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.css']
})
export class SourceCodeComponent implements OnInit {

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

  ngOnDestroy(): void 
  {
    this.langSub.unsubscribe();
  }

  setTitle() : void 
  {
    this.translateService.get("sourceCode.title").subscribe( str =>
      {
        this.titleService.setTitle(str);
      } )
  }
}
