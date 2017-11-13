import { Component, Input, OnInit } from '@angular/core';

import { ICountry } from './country.interface';
import { CountryPickerService } from './country-picker.service';

@Component({
  selector: 'country-picker',
  template: `<select class="form-control form-control-sm">
                <option *ngFor="let c of countries" [value]="getValue(c)">
                  <img *ngIf="flag" [src]="baseUrl + c.cca3.toLowerCase() + '.svg'">{{ getName(c) }}
                </option>
            </select>`
})
export class CountryPickerComponent implements OnInit {

  @Input() flag = false;
  @Input() setValue = 'cca3';
  @Input() setName = 'name.common';

  public countries: ICountry[] = [];
  public baseUrl: string;

  constructor(private countryPickerService: CountryPickerService) {
    this.baseUrl = countryPickerService.getBaseUrl() + 'data/';
  }

  public ngOnInit() {
    this.countryPickerService.getCountries().subscribe(countries => {
      this.countries = countries.sort((a: ICountry, b: ICountry) => {
        let na = this.getName(a);
        let nb = this.getName(b);
        if (na > nb) {
          return 1;
        }
        if (na < nb) {
          return -1;
        }
        return 0;
      });
    });
  }

  public getValue(obj: ICountry) {
    return this.setValue.split('.').reduce((o, i) => o[i], obj);
  }

  public getName(obj: ICountry) {
    return this.setName.split('.').reduce((o, i) => o[i], obj);
  }
}
