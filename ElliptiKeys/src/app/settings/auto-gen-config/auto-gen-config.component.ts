import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import LocalStorageHelper from 'lib/localstorage-helper';
import { AUTO_GEN_PAGE_SELECTION_TYPES } from 'lib/page-selection-types';
import { AutoGenService } from 'src/app/services/auto-gen/auto-gen.service';

@Component({
  selector: 'app-auto-gen-config',
  templateUrl: './auto-gen-config.component.html',
  styleUrls: ['./auto-gen-config.component.css']
})
export class AutoGenConfigComponent implements OnInit {

  autoGenService: AutoGenService;
  formName: string = Math.random().toString();
  
  autoGenPageSelectionFormControl: FormControl;
  autoGenStopSettingFormControl : FormControl;

  pageSelectionTypes = AUTO_GEN_PAGE_SELECTION_TYPES;

  constructor(ags: AutoGenService) 
  { 
    this.autoGenService = ags
    
    this.autoGenStopSettingFormControl = new FormControl(LocalStorageHelper.GetStopAutoGenOnYellow());
    this.autoGenPageSelectionFormControl = new FormControl(LocalStorageHelper.GetAutoGenPageSelectionType());
  }

  ngOnInit(): void {
  }

  onStopModeRadioButtonChanged(event: any) : void 
  {
    let val: boolean = event.target.value == "true";

    LocalStorageHelper.SetStopAutoGenOnYellowGreen(val);
  }

  onPageSelectionTypeChanged(event: any) : void 
  {
    let val: string = event.target.value;

    LocalStorageHelper.SetAutoGenPageSelectionType(val);
  }
}
