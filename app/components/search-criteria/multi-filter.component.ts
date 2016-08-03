import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { PluginConfig } from '../../services/plugin.config';
import { Filter } from "../../models/filter";

@Component({
    selector: 'search-multi-filter',
    templateUrl: '/app/templates/multi-filter.html'
})
export class MultiFilterComponent {
    @Input() filter: Filter;

    @Output() notify: EventEmitter<string[]> = new EventEmitter<string[]>();

    // get selected values and put them into array
    getValues(select: any): string[] {
      var options = select.options;
      var values: string[] = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      return values;
    }

    onMultiFilterChange($event: any) {
      this.notify.emit(this.getValues($event.target));
    }
}
