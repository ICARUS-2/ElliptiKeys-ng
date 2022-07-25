import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mnemonic-word-count-selector',
  templateUrl: './mnemonic-word-count-selector.component.html',
  styleUrls: ['./mnemonic-word-count-selector.component.css']
})
export class MnemonicWordCountSelectorComponent implements OnInit {
  
  static WORD_COUNTS = [12, 15, 18, 21, 24]
  wordCounts = MnemonicWordCountSelectorComponent.WORD_COUNTS;

  radioName = Math.random().toString();

  wordsFormControl: FormControl;

  @Output() itemChanged: EventEmitter<number> = new EventEmitter<number>();


  constructor() 
  {
    this.wordsFormControl = new FormControl(this.wordCounts[0])
  }

  ngOnInit(): void {
  }

  onRadioButtonChanged()
  {
    this.itemChanged.emit(this.wordsFormControl.value)
  }

}
