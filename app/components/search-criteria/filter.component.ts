import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { Filter } from "../../models/filter";

@Component({
    selector: 'search-filter',
    templateUrl: '/app/templates/filter.html'
})
export class FilterComponent {
    @Input() filter: Filter;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    onFilterChange($event: any) {
      this.notify.emit($event.target.value);
    }
}
