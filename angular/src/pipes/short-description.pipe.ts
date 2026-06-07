import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(value: string, wordCount: number = 3): string {
    if (!value) return '';
    const words = value.split(/\s+/).filter(Boolean);
    if (words.length <= wordCount) return value;
    return words.slice(0, wordCount).join(' ') + '...';
  }
}
