import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionSize'
})
export class DescriptionSizePipe implements PipeTransform {

  transform(input:String): String {
    return input.length > 100 ? input.substring(0, 100) + "..." : input;
  }

}
