import { Component, OnInit } from '@angular/core';
import { AutoGenService } from '../services/auto-gen/auto-gen.service';
import { AUTO_GEN_PAGE_SELECTION_TYPES } from 'lib/dictionaries/page-selection-types';

@Component({
  selector: 'app-auto-gen-settings-display',
  templateUrl: './auto-gen-settings-display.component.html',
  styleUrls: ['./auto-gen-settings-display.component.css']
})
export class AutoGenSettingsDisplayComponent implements OnInit {

  autoGenService: AutoGenService

  constructor(private ags: AutoGenService) 
  {
    this.autoGenService = ags;
  }

  ngOnInit(): void {
  }

  getAutoGenSelectionModeDisplay() : string
  {
    switch(this.autoGenService.getSelectionMode())
    {
      case AUTO_GEN_PAGE_SELECTION_TYPES.random:
        return "settings.autoGenSettingsDisplay.randomMode";
      case AUTO_GEN_PAGE_SELECTION_TYPES.incrementing:
        return "settings.autoGenSettingsDisplay.incrementingMode";
      case AUTO_GEN_PAGE_SELECTION_TYPES.decrementing:
        return 'settings.autoGenSettingsDisplay.decrementingMode';
      default: 
        return ""
    }
  }

}
