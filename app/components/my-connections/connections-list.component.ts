import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {ConnectionsListItemComponent} from './connections-list-item.component';

@Component({
    selector: 'connections-list',
    templateUrl: 'app/templates/connections-list.html',
    directives: [ConnectionsListItemComponent]
})
export class ConnectionsListComponent {

}
