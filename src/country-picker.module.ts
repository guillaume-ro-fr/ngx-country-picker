import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { COUNTRY_PICKER_CONFIG, COUNTRY_PICKER_CONFIG_DEFAULT, CountryPickerConfig } from './country-picker.config';
import { CountryPickerService } from './country-picker.service';
import { CountryPickerComponent } from './country-picker.component';

export function countryPickerServiceFactory(config: CountryPickerConfig, http: HttpClient) {
  return new CountryPickerService(config, http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    CountryPickerComponent
  ],
  exports: [
    CountryPickerComponent
  ]
})
export class CountryPickerModule {

  public static forRoot(providedConfig: CountryPickerConfig = COUNTRY_PICKER_CONFIG_DEFAULT): ModuleWithProviders<CountryPickerModule> {
    return {
      ngModule: CountryPickerModule,
      providers: [
        {provide: COUNTRY_PICKER_CONFIG, useValue: providedConfig},
        {
          provide: CountryPickerService,
          useFactory: countryPickerServiceFactory,
          deps: [COUNTRY_PICKER_CONFIG, HttpClient]
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CountryPickerModule) {
    if (parentModule) {
      throw new Error('CountryPickerModule is already loaded. Import it in the AppModule only');
    }
  }
}
