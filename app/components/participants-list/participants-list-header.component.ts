import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ParticipantsListHeaderColumnComponent } from './participants-list-header-column.component'

@Component({
    selector: 'participants-list-header',
    templateUrl: 'app/templates/participants-list-header.html',
    directives: [ParticipantsListHeaderColumnComponent]
})
export class ParticipantsListHeaderComponent {

}
