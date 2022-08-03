import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  langSub: Subscription;

  constructor(private titleService: Title, private translateService: TranslateService) {
    this.langSub = this.translateService.onLangChange.subscribe( ()=>
    {
      this.setTitle();
    } )
  }

  ngOnInit(): void {

  }

  setTitle()
  {
    this.translateService.get("donate.title").subscribe( str =>
      {
        this.titleService.setTitle(str);
      })
  }
}
