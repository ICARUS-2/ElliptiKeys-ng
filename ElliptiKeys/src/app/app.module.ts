import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KeyspageComponent } from './keyspage/keyspage.component';
import { FormsModule } from '@angular/forms';
import { TooFarComponent } from './too-far/too-far.component';
import { RandomComponent } from './random/random.component';
import * as $ from 'jquery';
import { KeyrowComponent } from './keyrow/keyrow.component';
import { PagebuttonsComponent } from './pagebuttons/pagebuttons.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    KeyspageComponent,
    TooFarComponent,
    RandomComponent,
    KeyrowComponent,
    PagebuttonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
