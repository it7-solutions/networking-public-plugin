import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import {Request} from "../../models/request";
import {RequestsService} from "../../services/requests.service";
import { RequestsListItemComponent } from './requests-list-item.component';

@Component({
    selector: 'requests-list',
    templateUrl: '/app/templates/requests-list.html',
    directives: [RequestsListItemComponent]
})
export class RequestsListComponent {
    @Input() list: Request[];

    constructor(private requests: RequestsService) {
    }

    ngOnInit() {
        this.requests.onUpdate.subscribe(requests => this.updateList(requests));
    }

    // Call from this class closure
    updateList(requests: Request[]){
        this.list = requests;
    }
}
