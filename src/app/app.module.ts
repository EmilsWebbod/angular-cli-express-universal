import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouterModule} from './router.module';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/pages/core.module';
import {ServiceModule} from './services/service.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-hour-planer'}),
    AppRouterModule,
    BrowserAnimationsModule,
    ServiceModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
