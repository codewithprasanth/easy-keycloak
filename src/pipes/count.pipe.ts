import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform {
  transform(value: any[], count: number = 3): any[] {
    return value.slice(0, count);
  }
}
