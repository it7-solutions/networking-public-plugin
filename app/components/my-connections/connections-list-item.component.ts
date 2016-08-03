import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import {Connection} from "../../models/connection";

@Component({
    selector: 'connections-list-item',
    templateUrl: '/app/templates/connections-list-item.html'
})
export class ConnectionsListItemComponent {
    @Input() connection: Connection;

}
