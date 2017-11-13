/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CountryPickerModule }  from 'ngx-country-picker';

@Component({
  selector: 'app',
  template: `<country-picker [flag]="false"></country-picker>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    CountryPickerModule.forRoot({baseUrl: 'node_modules/world-countries/', filename: 'countries.json'})
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
