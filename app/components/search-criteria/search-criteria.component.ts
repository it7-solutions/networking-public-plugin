import {Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild} from '@angular/core';

import { PluginConfig } from '../../services/plugin.config';
import { Filter } from "../../models/filter";
import { KeywordsComponent } from './keywords.component';
import { FilterComponent } from './filter.component';
import { MultiFilterComponent } from './multi-filter.component';
import * as _ from "underscore";

export interface SearchCriteria {
  filters: Filter[],
  keywords: string
}

@Component({
    selector: 'search-criteria',
    templateUrl: '/app/templates/search-criteria.html',
    directives: [KeywordsComponent, FilterComponent, MultiFilterComponent],
})
export class SearchCriteriaComponent {
    @ViewChild(MultiFilterComponent) multiFilter: MultiFilterComponent;
    @Output() notify: EventEmitter<SearchCriteria> = new EventEmitter<SearchCriteria>();
    filters: Filter[];
    keywords: string;

    constructor(private config: PluginConfig) {
      this.keywords = '';
      this.filters = config.filters;
    }

    ngAfterViewInit(){
        if(typeof this.config.onInitFilters == 'function'){
            this.config.onInitFilters();
        }
    }

    onKeywordNotify(message:string):void {
      this.keywords = message;
    }

    onFilterNotify(filter: Filter):void {
    }

    onMultiFilterNotify(message:string):void {
    }

    onResetClick() {
        _.each(this.filters, function (f) {
          f.value = '';
        });
        this.multiFilter.updateSelectList();
        this.keywords = '';
        this.onCriteriaChange();

        if(typeof this.config.onResetFilters == 'function'){
            this.config.onResetFilters();
        }
    }

    onCriteriaChange() {
      this.notify.emit({
        keywords: this.keywords,
        filters: this.filters
      });
    }
}
