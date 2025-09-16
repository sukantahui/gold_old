import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noCommaNumber' })
export class NoCommaNumberPipe implements PipeTransform {
    transform(value: number | string, digits: number = 3): string {
        if (value == null || value === '') { return ''; }
        const num = Number(value);
        return isNaN(num) ? '' : num.toFixed(digits);
    }
}
