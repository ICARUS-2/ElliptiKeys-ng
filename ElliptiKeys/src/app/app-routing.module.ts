import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { KeyspageComponent } from './keyspage/keyspage.component';
import { TooFarComponent } from './too-far/too-far.component';
import { RandomComponent } from './random/random.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'bitcoin/:id', component: KeyspageComponent}, 
  {path: 'too-far', component:TooFarComponent},
  {path: 'random', component:RandomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
