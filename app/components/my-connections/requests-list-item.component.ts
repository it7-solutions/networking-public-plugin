import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import {Request} from "../../models/request";

@Component({
    selector: 'requests-list-item',
    templateUrl: '/app/templates/requests-list-item.html'
})
export class RequestsListItemComponent {
    @Input() request: Request;

    onAcceptClick(){
        alert('ACCEPT Function not implemented! ('+this.request.id+')');
    }

    onRejectClick(){
        alert('REJECT Function not implemented! ('+this.request.id+')');
    }

}
