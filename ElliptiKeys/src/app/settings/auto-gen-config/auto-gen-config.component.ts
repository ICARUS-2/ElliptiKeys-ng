import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import LocalStorageHelper from 'lib/localstorage-helper';
import { AutoGenService } from 'src/app/services/auto-gen/auto-gen.service';

@Component({
  selector: 'app-auto-gen-config',
  templateUrl: './auto-gen-config.component.html',
  styleUrls: ['./auto-gen-config.component.css']
})
export class AutoGenConfigComponent implements OnInit {

  autoGenService: AutoGenService;
  formName: string = Math.random().toString();
  autoGenStopSettingFormControl : FormControl;

  constructor(ags: AutoGenService) 
  { 
    this.autoGenService = ags
    this.autoGenStopSettingFormControl = new FormControl(LocalStorageHelper.GetStopAutoGenOnYellow())
  }

  ngOnInit(): void {
  }

  onStopModeRadioButtonChanged(event: any) : void 
  {
    let val: boolean = event.target.value == "true";
    console.log(val)

    LocalStorageHelper.SetStopAutoGenOnYellowGreen(val);
    //console.log(LocalStorageHelper.GetStopAutoGenOnYellow())
  }

}
