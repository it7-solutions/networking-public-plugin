import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { Filter } from "../../models/filter";

@Component({
    selector: 'search-filter',
    templateUrl: '/app/templates/filter.html'
})
export class FilterComponent {
    @Input() filter: Filter;
    @Output() notify: EventEmitter<Filter> = new EventEmitter<Filter>();

    onFilterChange($event: any) {
        this.filter.value = $event.target.value;
        this.notify.emit(this.filter);
    }
}
