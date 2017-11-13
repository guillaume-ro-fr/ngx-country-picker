import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CountryPickerConfig, COUNTRY_PICKER_CONFIG_DEFAULT, COUNTRY_PICKER_CONFIG } from './country-picker.config';
import { CountryPickerService } from './country-picker.service';
import { CountryPickerComponent } from './country-picker.component';

export * from './country.interface';
export * from './country-picker.config';
export * from './country-picker.service';
export * from './country-picker.component';

export function countryPickerServiceFactory(config: CountryPickerConfig, http: Http) {
  return new CountryPickerService(config, http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    CountryPickerComponent
  ],
  exports: [
    CountryPickerComponent
  ]
})
export class CountryPickerModule {

  public static forRoot(providedConfig: CountryPickerConfig = COUNTRY_PICKER_CONFIG_DEFAULT): ModuleWithProviders {
    return {
      ngModule: CountryPickerModule,
      providers: [
        { provide: COUNTRY_PICKER_CONFIG, useValue: providedConfig },
        {
          provide: CountryPickerService,
          useFactory: countryPickerServiceFactory,
          deps: [COUNTRY_PICKER_CONFIG, Http]
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CountryPickerModule) {
    if (parentModule) {
      throw new Error(
        'CountryPickerModule is already loaded. Import it in the AppModule only');
    }
  }
}
