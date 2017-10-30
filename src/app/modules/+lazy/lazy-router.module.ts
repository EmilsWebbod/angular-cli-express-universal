

import {NgModule} from '@angular/core';
import {LazyComponent} from './lazy.component';
import {RouterModule} from '@angular/router';

const lazyRoutes = [
  {path: '', component: LazyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(lazyRoutes)],
  exports: [RouterModule]
})
export class LazyRouterModule {}
