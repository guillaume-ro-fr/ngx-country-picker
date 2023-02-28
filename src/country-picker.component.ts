import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { ICountry } from './country.interface';
import { CountryPickerService } from './country-picker.service';

@Component({
  selector: 'country-picker',
  template: `
      <select [class]="classes">
          <option *ngFor="let c of countries" [value]="getValue(c)">
              <img *ngIf="flag" [src]="baseUrl + c.cca3.toLowerCase() + '.svg'">{{ getName(c) }}
          </option>
      </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPickerComponent implements OnInit {

  @Input() public flag = false;
  @Input() public setValue = 'cca3';
  @Input() public setName = 'name.common';
  @Input() public classes = ['form-control', 'form-control-sm'];

  public countries: ICountry[] = [];
  public baseUrl: string;

  constructor(
    private _countryPickerService: CountryPickerService,
    private _cdr: ChangeDetectorRef,
  ) {
    this.baseUrl = _countryPickerService.getBaseUrl() + 'data/';
  }

  public ngOnInit(): void {
    this._countryPickerService.getCountries()
      .subscribe(countries => {
        this.countries = countries.sort((a: ICountry, b: ICountry) => {
          const na = this.getName(a);
          const nb = this.getName(b);
          if (na > nb) {
            return 1;
          }
          if (na < nb) {
            return -1;
          }
          return 0;
        });
        this._cdr.markForCheck();
      });
  }

  public getValue(obj: ICountry): string {
    return this.setValue.split('.').reduce((o, i) => o[i], obj);
  }

  public getName(obj: ICountry): string {
    return this.setName.split('.').reduce((o, i) => o[i], obj);
  }
}
