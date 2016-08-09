import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import {Participant} from "../../models/participant";
import { PopupService } from "../../services/popup.service";
import {RequestPopup} from "../request-popup.component";

@Component({
    selector: 'participants-list-item',
    templateUrl: '/app/templates/participants-list-item.html'
})
export class ParticipantsListItemComponent {
    @Input() participant: Participant;


    constructor( private requestPopupService: PopupService) {
    }

    getInTouchClick(event:any){
        event.stopPropagation();
        // this.requestPopupService.showPopup({
        //     recipient: this.participant
        // });
        var popup = new RequestPopup(this.participant);
        this.requestPopupService.showPopup(popup);
    }

    expandCollapseClick(){
        this.participant._expanded = !this.participant._expanded;
    }
}
