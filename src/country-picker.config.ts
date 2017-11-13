import { InjectionToken } from '@angular/core';

export const COUNTRY_PICKER_CONFIG = new InjectionToken<CountryPickerConfig>('countrypicker.config');

export interface CountryPickerConfig {
    baseUrl: string;
    filename: string;
}

export const COUNTRY_PICKER_CONFIG_DEFAULT: CountryPickerConfig = {
    baseUrl: 'assets/',
    filename: 'countries.json',
};
