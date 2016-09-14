/* tslint:disable:no-unused-variable */
import { PluginComponent } from './plugin.component';
import { PluginConfig } from '../services/plugin.config';

import { async, inject, beforeEachProviders, addProviders } from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/core/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

// // Mock config
// let pluginConfig = new PluginConfig({
//     getListsUrl: 'get-lists-url',
//     createRequestUrl: 'create-request-url',
//     acceptRequestUrl: 'accept-request-url',
//     rejectRequestUrl: 'reject-request-url',
//     filters: [],
//     searchField: 'name',
//     translations: [],
//     participantId: 1,
//     participantsPerPage: 10,
//     participantsSortBy: '',
//     participantsSortDesc: false
// });
// beforeEach(() => addProviders([
//   { provide: PluginConfig, useValue: pluginConfig }
// ]));

////////  SPECS  /////////////

/// Delete this
// describe('Smoke test', () => {
//   it('should run a passing test', () => {
//     expect(true).toEqual(true, 'should pass');
//   });
// });

// describe('PluginComponent with TCB', function () {
//
//   it('should instantiate component',
//     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
//     //tcb.overrideProviders(ListComponent, [provide(UserService, {useClass: MockUserService})])
//     tcb.createAsync(PluginComponent).then(fixture => {
//       expect(fixture.componentInstance instanceof PluginComponent).toBe(true, 'should create PluginComponent');
//     });
//   })));
//
//   // it('should have expected <h1> text',
//   //   async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
//   //
//   //     tcb.createAsync(PluginComponent).then(fixture => {
//   //     // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
//   //
//   //     let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works
//   //
//   //         h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred
//   //
//   //     expect(h1.innerText).toMatch(/angular 2 app/i, '<h1> should say something about "Angular 2 App"');
//   //   });
//   //
//   // })));
//
//
// });

import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReflectiveInjector} from '@angular/core';
it('should get a response', () => {
    var connection; //this will be set when a new connection is emitted from the backend.
    var text; //this will be set from mock response
    var injector = ReflectiveInjector.resolveAndCreate([
        MockBackend,
        BaseRequestOptions,
        {provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
        }, deps: [MockBackend, BaseRequestOptions]}]);
    var backend = injector.get(MockBackend);
    var http = injector.get(Http);
    backend.connections.subscribe(c => connection = c);
    http.request('something.json').subscribe(res => {
        text = res.text();
    });
    connection.mockRespond(new Response(new ResponseOptions({ body: 'Something' })));
    expect(text).toBe('Something');
});