import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouterModule} from './router.module';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/pages/core.module';
import {ServiceModule} from './services/service.module';
import {DefaultUrlSerializer, UrlSerializer, UrlTree} from '@angular/router';

/**
 * This will change all %20 in url to +
 */
export class CustomUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    // Change plus signs to encoded spaces
    url = url.replace(/\+/g, '%20');
    // Use the default serializer that you can import to just do the
    // default parsing now that you have fixed the url.
    return super.parse(url);
  }

  serialize(tree: UrlTree): string {
    // Use the default serializer to create a url and replace any spaces with + signs
    return super.serialize(tree).replace(/%20/g, '+');
  }
}

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
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
