import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { PluginConfig } from '../../services/plugin.config';
import { Filter } from "../../models/filter";

@Component({
    selector: 'search-multi-filter',
    templateUrl: '/app/templates/multi-filter.html'
})
export class MultiFilterComponent {
    @Input() filter: Filter;

}
