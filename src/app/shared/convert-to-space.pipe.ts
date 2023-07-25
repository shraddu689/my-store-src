import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpace'
})
export class ConvertToSpacePipe implements PipeTransform {

  transform(value: string, replaceWith: string = ""): string {
    return value.replace("-",replaceWith);
  }

}
