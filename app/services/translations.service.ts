import {Injectable} from "@angular/core";

import {PluginConfig} from './plugin.config';

@Injectable()
export class TranslationsService {
    private codes: any;
    private translationsByCode: any;

    constructor(
        private config: PluginConfig
    ) {
        this.codes = {};
        this.translationsByCode = TranslationsService.indexTranslations(config.translations);
        window['t'] = this.codes;
    }

    public translate(text: string): string {
        var t = this.getTranslation(this.buildCode(text), text);
        return t;
    }

    private buildCode(text:string):string{
        var code = text.toLowerCase().replace(/([^a-z0-9])/g, '_');
        this.codes[code] = this.codes[code] ? this.codes[code]++ : 1;
        return code;
    }

    private getTranslation(code:string, fallback: string):string{
        var translation: any;
        // If exist custom translate function - call
        if(typeof this.config.onTranslate === 'function'){
            translation = this.config.onTranslate(code, fallback);
        }
        // If not translated - get translation from passed translations
        if(typeof translation != 'string'){
            translation = this.translationsByCode[code];
        }
        // If not fount translations - use fallback
        return translation === undefined ? fallback : translation;
    }

    private static indexTranslations(translations: any[]):any{
        var indexed = {};
        for(var t in translations){
            indexed[translations[t].code] = translations[t].value;
        }
        return indexed;
    }
}
