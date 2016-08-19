import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})

// This pipe transforms incoming array of values ['a', 'b', 'c'] from this view: a,b,c to this: a, b, c
export class JoinPipe implements PipeTransform{
  transform(value: any) {
    return value.join(', ');
  }
}
