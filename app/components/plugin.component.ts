import {Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild} from '@angular/core';

import { PluginConfig }    from '../services/plugin.config';
import { It7ErrorService } from "../services/it7-error.service";
import { It7AjaxService } from "../services/it7-ajax.service";
import { TranslationsService }    from '../services/translations.service';
import { ParticipantsService } from '../services/participants.service'
import { RequestsService } from '../services/requests.service'
import { ConnectionsService } from '../services/connections.service'
import { DataManagerService } from '../services/data-manager.service'
import { RequestPopupService } from '../services/request-popup.service'
import { SearchCriteriaComponent, SearchCriteria } from './search-criteria/search-criteria.component'
import { ParticipantsListComponent } from './participants-list/participants-list.component'
import { MyConnectionsComponent } from './my-connections/my-connections.component'
import { RequestPopupComponent } from './request-popup.component'

// import {enableProdMode} from '@angular/core';
// enableProdMode();

@Component({
    selector: 'it7-networking-public-plugin',
    templateUrl: '/app/templates/networking-public-plugin.html',
    directives: [
        SearchCriteriaComponent,
        ParticipantsListComponent,
        MyConnectionsComponent,
        RequestPopupComponent
    ],
    providers: [
        It7ErrorService,
        It7AjaxService,
        TranslationsService,
        ParticipantsService,
        RequestsService,
        ConnectionsService,
        DataManagerService,
        RequestPopupService
    ]
})
export class PluginComponent {
    @ViewChild(ParticipantsListComponent) participantsList: ParticipantsListComponent;

    private templateBase: string;

    constructor(
        private pluginConfig: PluginConfig,
        private dataManager: DataManagerService
    ) {
        this.templateBase = pluginConfig.templatesBaseUrl;
        console.log('pluginConfig', this.pluginConfig);
    }

    getItems() {
        //init plugin
        this.dataManager.initData().then(function(data){ console.log('data', data)});
    }

    ngOnInit() {
        this.getItems();
    }

    tmpUpdateParticipants(){
        console.log('TMP');
        var f:any[] = [
            {value: 'ca-fr', field: 'language'},
            {value: '', field: 'email'},
            {value: ['rock', 'golf'], field: 'area_of_expertise'}
            ];
        this.participantsList.setFilters('man',<any[]> f);
        this.participantsList.setSorting('fname', true);
        //this.dataManager.reinitData();
    }

    onCriteriaNotify(criteria: SearchCriteria):void {
      console.log('message from plugin.component.ts',criteria);
      this.participantsList.setFilters(criteria.keywords, criteria.filters);
    }
}
