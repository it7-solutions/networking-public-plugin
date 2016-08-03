import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';

import { PluginConfig } from '../../services/plugin.config';
import { Filter } from "../../models/filter";

@Component({
    selector: 'search-multi-filter',
    templateUrl: '/app/templates/multi-filter.html'
})
export class MultiFilterComponent {
    @ViewChild('select') selectElRef: any;
    @Input() filter: Filter;

    @Output() notify: EventEmitter<Filter> = new EventEmitter<Filter>();

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

    onMultiFilterChange($event:any) {
      this.filter.value = this.getValues($event.target) as any;
      this.notify.emit(this.filter);
    }

    ngAfterViewInit() {
      this.updateSelectList();
    }

    updateSelectList() {
      console.log('works');
      console.log(this);
      let options = this.selectElRef.nativeElement.options;
      for (let i = 0; i < options.length; i++) {
        options[i].selected = this.filter.value && this.filter.value.indexOf(options[i].value) > -1;
      }
    }
}
