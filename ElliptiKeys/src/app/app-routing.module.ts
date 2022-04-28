import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { KeyspageComponent } from './keyspage/keyspage.component';
import { TooFarComponent } from './too-far/too-far.component';
import { RandomComponent } from './random/random.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { DonateComponent } from './donate/donate.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'bitcoin/:id', component: KeyspageComponent}, 
  {path: 'too-far', component:TooFarComponent},
  {path: 'random', component:RandomComponent},
  {path: 'about', component:AboutComponent},
  {path: 'donate', component: DonateComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
