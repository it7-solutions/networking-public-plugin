import {Injectable} from "@angular/core";
import {PluginConfig} from './plugin.config';

@Injectable()
export class TranslationsService {

    constructor(
        private config: PluginConfig
    ){}

}