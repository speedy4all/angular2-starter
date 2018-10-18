import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'truncate' })

export class TruncatePipe implements PipeTransform {
    transform(value: string, chars: number): string {
        return `${value.substring(0, chars)} ...`;
    }
}