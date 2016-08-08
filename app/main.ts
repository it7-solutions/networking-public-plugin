// declare var __webpack_public_path__: string;
// var src = document.querySelector('[src*="bundle"]').getAttribute("src");
// __webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);
// console.log(__webpack_public_path__);

///<reference path="../typings/index.d.ts"/>
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_PIPES } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ViewResolver } from '@angular/compiler';
// import { BaseRequestOptions, Http } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';

import { ViewResolverService } from './services/view-resolver.service';
import { PluginComponent } from './components/plugin.component';
import { PluginConfig, PluginOptions }    from './services/plugin.config';
import { TranslationPipe }    from './pipes/translation.pipe';

export function RunApplication(options: PluginOptions) {

    // Create our API config provider using the external data
    //
    let menuConfig = new PluginConfig(options);
    window && (window['__it7_networking_plugin__'] = menuConfig.templatesBaseUrl);

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

        { provide: Window, useValue: window },
        { provide: PluginConfig, useValue: menuConfig },
        { provide: ViewResolver, useClass: ViewResolverService},
        [{provide: PLATFORM_PIPES, useValue: [TranslationPipe], multi:true}]
    ]);
}

window['RunApplication'] = RunApplication;
//bootstrap(PluginComponent);
