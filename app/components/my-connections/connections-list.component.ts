import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';

import {Connection} from "../../models/connection";
import {ConnectionsService} from "../../services/connections.service";
import {ConnectionsListItemComponent} from './connections-list-item.component';

@Component({
    selector: 'connections-list',
    templateUrl: '/app/templates/connections-list.html',
    directives: [ConnectionsListItemComponent]
})
export class ConnectionsListComponent {
    @Input() list: Connection[];

    constructor(private connections: ConnectionsService) {
    }

    ngOnInit() {
        this.connections.onUpdate.subscribe(connections => this.updateList(connections));
    }

    // Call from this class closure
    updateList(connections: Connection[]){
        this.list = connections;
    }
}
