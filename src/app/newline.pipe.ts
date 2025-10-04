import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newline'
})
export class NewlinePipe implements PipeTransform {
  // Ersetzt alle Zeilenumbrüche (\n) durch <br> Tags
  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }
}