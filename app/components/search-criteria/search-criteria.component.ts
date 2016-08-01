import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { PluginConfig } from '../../services/plugin.config';
import { KeywordsComponent } from './keywords.component';
import { FilterComponent } from './filter.component';
import { MultiFilterComponent } from './multi-filter.component';

@Component({
    selector: 'search-criteria',
    templateUrl: '/app/templates/search-criteria.html',
    directives: [KeywordsComponent, FilterComponent, MultiFilterComponent],
})
export class SearchCriteriaComponent {

    constructor(private config: PluginConfig) {
    }

}
