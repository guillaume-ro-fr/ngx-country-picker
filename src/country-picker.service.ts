import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { COUNTRY_PICKER_CONFIG, CountryPickerConfig } from './country-picker.config';
import { ICountry } from './country.interface';

@Injectable()
export class CountryPickerService {

  private baseUrl: string;
  private filename: string;
  private data: Observable<ICountry[]> = null;

  private static handleError(error: HttpResponse<any> | any) {
    let errMsg: string;
    if (error instanceof HttpResponse) {
      if (error.status === 404) {
        errMsg = 'Error loading countries.json file.'
          + ' Please configure WebPack and load countries.json assets to your root folder';
      } else {
        const body = error.body || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(@Inject(COUNTRY_PICKER_CONFIG) config: CountryPickerConfig, private http: HttpClient) {
    this.baseUrl = config.baseUrl;
    this.filename = config.filename;
    this.data = this.loadData();
  }

  public getCountries(): Observable<ICountry[]> {
    return this.data.map((countries: ICountry[]) => countries.map((country: ICountry) => {
      country.name.native[0] = country.name.native[Object.keys(country.name.native)[0]];
      return country;
    }));
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  private loadData(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.baseUrl + this.filename)
      .catch(CountryPickerService.handleError);
  }
}
