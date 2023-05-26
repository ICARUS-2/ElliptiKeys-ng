import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-page-stats-display',
  templateUrl: './current-page-stats-display.component.html',
  styleUrls: ['./current-page-stats-display.component.css']
})
export class CurrentPageStatsDisplayComponent implements OnInit {

  @Input() redCounter: number = 0;
  @Input() yellowCounter: number = 0;
  @Input() greenCounter: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
