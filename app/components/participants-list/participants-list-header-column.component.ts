import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { SortOptions } from '../../models/sort'

@Component({
    selector: 'participants-list-header-column',
    templateUrl: '/app/templates/participants-list-header-column.html'
})
export class ParticipantsListHeaderColumnComponent {
    @Input() sortByThis: boolean;
    @Input() sortDesc: boolean;
    @Input() field: string;
    @Input() title: boolean;
    @Output() sort: EventEmitter<SortOptions> = new EventEmitter<SortOptions>();

    ngAfterViewChecked(){
        console.log('HEADER this.sortByThis');
        console.log(this.sortByThis);
    }

    onClick(){
        this.sort.emit({
            fieldName: this.field,
            descending: this.sortByThis && !this.sortDesc
        });
    }
}
