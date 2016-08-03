import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import {Participant} from "../../models/participant";

@Component({
    selector: 'participants-list-item',
    templateUrl: '/app/templates/participants-list-item.html'
})
export class ParticipantsListItemComponent {
    @Input() participant: Participant;

    getInTouchClick(){
        alert('Function not implemented!');
    }
}
