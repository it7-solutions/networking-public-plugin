///<reference path="../typings/index.d.ts"/>
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_PIPES } from '@angular/core';

import { PluginComponent } from './components/plugin.component';
import { PluginConfig, PluginOptions }    from './services/plugin.config';
import { TranslationPipe }    from './pipes/translation.pipe';

export function RunApplication(options: PluginOptions) {

    // Create our API config provider using the external data
    //
    let menuConfig = new PluginConfig(options);

    // Now we can call bootstrap, but we have the API config object
    //  set up as well. Just create is as an injectable token here
    //  so other components/services can consume it.
    //
    bootstrap(PluginComponent, [
        { provide: PluginConfig, useValue: menuConfig },
        [{provide: PLATFORM_PIPES, useValue: [TranslationPipe], multi:true}]
    ]);
}

window['RunApplication'] = RunApplication;
//bootstrap(PluginComponent);
