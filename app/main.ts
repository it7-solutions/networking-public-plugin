///<reference path="../typings/index.d.ts"/>
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_PIPES } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
// import { BaseRequestOptions, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';

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
        HTTP_PROVIDERS,
        // BaseRequestOptions,
        // MockBackend,
        // {
        //     provide: Http,
        //     useFactory: (backend:any, options:any) => {
        //         console.log('new http');
        //         return new Http(backend, options);
        //     },
        //     deps: [MockBackend, BaseRequestOptions]
        // },

        { provide: PluginConfig, useValue: menuConfig },
        [{provide: PLATFORM_PIPES, useValue: [TranslationPipe], multi:true}]
    ]);
}

window['RunApplication'] = RunApplication;
//bootstrap(PluginComponent);
