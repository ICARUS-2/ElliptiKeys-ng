import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import LocalStorageHelper from 'lib/localstorage-helper';
import { AutoGenService } from './services/auto-gen/auto-gen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ElliptiKeys';

  constructor(private router: Router, private autoGenService: AutoGenService, translate: TranslateService)
  {
    router.routeReuseStrategy.shouldReuseRoute = () => false

    translate.addLangs(['en', 'fr']);

    if (LocalStorageHelper.getLang())
    {
      //@ts-ignore
      translate.use(LocalStorageHelper.getLang())
    }
    else
    {
      //@ts-ignore
      translate.use("en");
    }
  }

  ngOnInit()
  {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
        //Future navigation detection stuff
      }

      if (event instanceof RoutesRecognized)
      {
        let data = event.state.root.firstChild?.data

        if (data)
        {
          if (data["routeName"])
          {

            let routeName = data["routeName"]

            //Will shut off auto-gen if user navigates away from keyspage
            let routeIsKeyspage = routeName.includes("keyspage")
            let routeIsRandom = routeName.includes("random")

            if (!routeIsKeyspage)
            {
              if (!routeIsRandom)
              {
                this.autoGenService.cancel();
              }
            }
            

          }//end of routename check
        }//end of undefined check
      }//end of checking instance of route
   })
  }
}

