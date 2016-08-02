import { Pipe, PipeTransform } from '@angular/core';

import { TranslationsService } from '../services/translations.service';

@Pipe({
    name: 'translation'
})
export class TranslationPipe implements PipeTransform {

    transform(text: string, service: TranslationsService ): string {
        return service.translate(text);
    }
}