import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CountryPickerComponent } from './country-picker.component';

describe('CountryPickerComponent', () => {

  let comp: CountryPickerComponent;
  let fixture: ComponentFixture<CountryPickerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryPickerComponent], // declare the test component
    });

    fixture = TestBed.createComponent(CountryPickerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
