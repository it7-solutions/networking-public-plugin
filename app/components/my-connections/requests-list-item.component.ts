import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import {Request} from "../../models/request";
import {DataManagerService} from "../../services/data-manager.service";

@Component({
    selector: 'requests-list-item',
    templateUrl: '/app/templates/requests-list-item.html'
})
export class RequestsListItemComponent {
    @Input() request: Request;

    constructor(private dataManager: DataManagerService) {
    }

    onAcceptClick(){
        this.dataManager.acceptRequest(this.request.id);
    }

    onRejectClick(){
        this.dataManager.rejectRequest(this.request.id);
    }

}
