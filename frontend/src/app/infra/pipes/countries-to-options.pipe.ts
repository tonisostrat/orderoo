import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../../shared/countries/country.types';

@Pipe({
  name: 'countriesToOptions',
})
export class CountriesToOptionsPipe implements PipeTransform {
  transform(value: Country[]): string[] {
    return value.map((country) => country.name.common).sort();
  }
}
