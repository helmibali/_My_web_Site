import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    //tchourabi@gmail.com
    //t*************@gmail.com
    
    return value[0]+'*****************'+'@'+value.split('@')[1];
  }

}
