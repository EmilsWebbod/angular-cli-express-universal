import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lazy', loadChildren: './modules/+lazy/lazy.module#LazyModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
