import {Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild} from '@angular/core';

import { PluginConfig }    from '../services/plugin.config';
import { It7ErrorService } from "../services/it7-error.service";
import { It7AjaxService } from "../services/it7-ajax.service";
import { TranslationsService }    from '../services/translations.service';
import { ParticipantsService } from '../services/participants.service'
import { RequestsService } from '../services/requests.service'
import { ConnectionsService } from '../services/connections.service'
import { DataManagerService } from '../services/data-manager.service'
import { SearchCriteriaComponent, SearchCriteria } from './search-criteria/search-criteria.component'
import { ParticipantsListComponent } from './participants-list/participants-list.component'
import { MyConnectionsComponent } from './my-connections/my-connections.component'
import { PopupService } from '../services/popup.service'
import { RequestPopupComponent } from './request-popup.component'
import { BusyPopupComponent } from './busy-popup.component'

// import {enableProdMode} from '@angular/core';
// enableProdMode();

@Component({
    selector: 'it7-networking-public-plugin',
    templateUrl: '/app/templates/networking-public-plugin.html',
    directives: [
        SearchCriteriaComponent,
        ParticipantsListComponent,
        MyConnectionsComponent,
        RequestPopupComponent,
        BusyPopupComponent
    ],
    providers: [
        It7ErrorService,
        It7AjaxService,
        TranslationsService,
        ParticipantsService,
        RequestsService,
        ConnectionsService,
        DataManagerService,
        PopupService
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
    }

    getItems() {
        //init plugin
        this.dataManager.initData();
    }

    ngOnInit() {
        this.getItems();
    }

    onCriteriaNotify(criteria: SearchCriteria):void {
      this.participantsList.setFilters(criteria.keywords, criteria.filters);
    }
}
