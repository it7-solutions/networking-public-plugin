import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { PluginConfig } from '../../services/plugin.config';
import { Filter } from "../../models/filter";
import { KeywordsComponent } from './keywords.component';
import { FilterComponent } from './filter.component';
import { MultiFilterComponent } from './multi-filter.component';

@Component({
    selector: 'search-criteria',
    templateUrl: '/app/templates/search-criteria.html',
    directives: [KeywordsComponent, FilterComponent, MultiFilterComponent],
})
export class SearchCriteriaComponent {
    filters: Filter[];
    keywords: string;

    constructor(private config: PluginConfig) {
      this.keywords = 'default';
      this.filters = config.filters;
      console.log(config.filters);
    }
    onKeywordNotify(message:string):void {
      console.log(message);
    }
    onFilterNotify(message:string):void {
      console.log(message);
    }
    onMultiFilterNotify(message:string):void {
      console.log(message);
    }
}
