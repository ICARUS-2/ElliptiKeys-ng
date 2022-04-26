import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { KeyspageComponent } from './keyspage/keyspage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'bitcoin', component: KeyspageComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
