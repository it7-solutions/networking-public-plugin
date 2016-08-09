import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { SortOptions } from '../../models/sort'
import { ParticipantsListHeaderColumnComponent } from './participants-list-header-column.component'

@Component({
    selector: 'participants-list-header',
    templateUrl: '/app/templates/participants-list-header.html',
    directives: [ParticipantsListHeaderColumnComponent]
})
export class ParticipantsListHeaderComponent {
    @Input() sortBy: string;
    @Input() sortDesc: boolean;
    @Output() sort: EventEmitter<SortOptions> = new EventEmitter<SortOptions>();

    onSortChange(sort: SortOptions){
        this.sort.emit(sort);
    }
}
