import { NgModule } from '@angular/core';
import { LazyComponent } from './lazy.component';
import {SharedModule} from '../../shared/shared.module';
import {LazyRouterModule} from './lazy-router.module';

@NgModule({
  imports: [
    SharedModule,
    LazyRouterModule
  ],
  declarations: [
    LazyComponent
  ]
})
export class LazyModule { }
