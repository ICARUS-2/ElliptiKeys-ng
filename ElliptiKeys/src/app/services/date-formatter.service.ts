import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }

  formatUnixTime(unixTime: number | undefined)
  {
    if (unixTime == undefined)
      return "";

    let d = new Date(unixTime * 1000);

    let dateStr = d.toLocaleDateString("en-US");
    let timeStr = d.toLocaleTimeString("en-US");

    return dateStr + " " + timeStr
  }
}
