import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ParticipantsListItemComponent } from './participants-list-item.component';
import { ParticipantsListHeaderComponent } from './participants-list-header.component';
import { ParticipantsListHeaderColumnComponent } from './participants-list-header-column.component';

@Component({
    selector: 'participants-list',
    templateUrl: 'app/templates/participants-list.html',
    directives: [ParticipantsListItemComponent, ParticipantsListHeaderComponent, ParticipantsListHeaderColumnComponent]
})
export class ParticipantsListComponent {

}
