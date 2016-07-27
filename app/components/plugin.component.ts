import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { PluginConfig }    from '../services/plugin.config';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component'
import { ParticipantsListComponent } from './participants-list/participants-list.component'
import { MyConnectionsComponent } from './my-connections/my-connections.component'

// import {enableProdMode} from '@angular/core';
// enableProdMode();

@Component({
    selector: 'it7-networking-public-plugin',
    templateUrl: 'app/templates/networking-public-plugin.html',
    directives: [SearchCriteriaComponent, ParticipantsListComponent, MyConnectionsComponent],
    providers: []
})
export class PluginComponent {

    constructor(private pluginConfig: PluginConfig) {
        console.log('pluginConfig', this.pluginConfig);
        // Set @Component in code
        // this._component = {
        //     selector: 'base-panel',
        //     template: '<div class="panel" [style.background-color]="color" (click)="onClick($event)">{{content}}</div>',
        //     styles: [`
        //       .panel{
        //         padding: 50px;
        //       }
        //       `]
        // };
    }

    getItems() {
        //init plugin
    }

    ngOnInit() {
        this.getItems();
    }
}
