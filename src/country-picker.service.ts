import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { COUNTRY_PICKER_CONFIG, CountryPickerConfig } from './country-picker.config';
import { ICountry } from './country.interface';

@Injectable()
export class CountryPickerService {

  private readonly _baseUrl: string;
  private readonly _filename: string;
  private _data: Observable<ICountry[]> | null = null;

  protected static handleError(error: HttpResponse<any> | any): Observable<any> {
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
    return throwError(errMsg);
  }

  constructor(
    @Inject(COUNTRY_PICKER_CONFIG) config: CountryPickerConfig,
    private _http: HttpClient
  ) {
    this._baseUrl = config.baseUrl;
    this._filename = config.filename;
    this._data = this._loadData();
  }

  public getCountries(): Observable<ICountry[]> {
    return this._data
      .pipe(
        map((countries: ICountry[]) =>
          countries.map((country: ICountry) => {
            country.name.native[0] = country.name.native[Object.keys(country.name.native)[0]];
            return country;
          })
        )
      );
  }

  public getBaseUrl(): string {
    return this._baseUrl;
  }

  private _loadData(): Observable<ICountry[]> {
    return this._http.get<ICountry[]>(this._baseUrl + this._filename)
      .pipe(
        catchError(CountryPickerService.handleError)
      );
  }
}
