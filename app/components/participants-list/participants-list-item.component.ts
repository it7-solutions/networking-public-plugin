import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import {Participant} from "../../models/participant";
import { RequestPopupService } from "../../services/request-popup.service";

@Component({
    selector: 'participants-list-item',
    templateUrl: '/app/templates/participants-list-item.html'
})
export class ParticipantsListItemComponent {
    @Input() participant: Participant;


    constructor( private requestPopupService: RequestPopupService) {
    }

    getInTouchClick(event:any){
        event.stopPropagation();
        this.requestPopupService.showPopup({
            recipient: this.participant
        });
    }

    expandCollapseClick(){
        this.participant._expanded = !this.participant._expanded;
    }
}
