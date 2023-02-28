# DEPRECATED : This module is deprecated. Please create your own service with [world-countries](https://www.npmjs.com/package/world-countries)

# ngx-country-picker

[![Build Status](https://travis-ci.org/guillaume-ro-fr/ngx-country-picker.svg?branch=master)](https://travis-ci.org/guillaume-ro-fr/ngx-country-picker)
[![GitHub Downloads All Releases](https://img.shields.io/github/downloads/guillaume-ro-fr/ngx-country-picker/total.svg)](https://github.com/guillaume-ro-fr/ngx-country-picker)
[![npm Downloads All Releases](https://img.shields.io/npm/dw/ngx-country-picker.svg)](https://www.npmjs.com/package/ngx-country-picker)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fguillaume-ro-fr%2Fngx-country-picker.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fguillaume-ro-fr%2Fngx-country-picker?ref=badge_shield)
[![Angular Version](https://img.shields.io/badge/Angular-%3E%3D12%20%3C16-brightgreen)](https://angular.io/)

This Angular module provides a service and a component to show a country picker with localizable names, inspired
by [Paldom/angular2-countrypicker](https://github.com/Paldom/angular2-countrypicker)

## Installation

To install this library, run:

```bash
$ npm install ngx-country-picker --save
```

or with Yarn :

```bash
$ yarn add ngx-country-picker
```

## Consuming the Country Picker

Add the `CountryPickerModule` to your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { CountryPickerModule } from 'ngx-country-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Import here
    CountryPickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Once CountryPicker is imported, you can use the component in your Angular application:

```html
<!-- You can now use the CountryPickerComponent in app.component.html -->
<h1>
    {{title}}
</h1>
<country-picker [flag]="false" [setValue]="'cca3'" [setName]="'name.common'"
                [classes]="['form-control']"></country-picker>
```

You can also use the CountryPickerService to import the list of countries in your app:

```typescript
export class YourComponent {

  public countries: ICountry[] = [];

...

  constructor(protected countryPicker: CountryPickerService) {

  }

...

  public ngOnInit(): void {
    this.countryPicker.getCountries()
      .subscribe((countries: ICountry[]) => this.countries = countries);
  }

...
}
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ yarn run build
```

To lint all `*.ts` files:

```bash
$ yarn run lint
```

## License

MIT © [Guillaume RODRIGUEZ](https://github.com/guillaume-ro-fr)
