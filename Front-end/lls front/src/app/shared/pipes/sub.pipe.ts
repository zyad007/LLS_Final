import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sub',
})
export class SubPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value.length > 10) {
      return value.substr(0, 10);
    }
    return value;
  }
}
