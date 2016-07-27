import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { RequestsListComponent } from './requests-list.component';
import { ConnectionsListComponent } from './connections-list.component';

@Component({
    selector: 'my-connections',
    templateUrl: 'app/templates/my-connections.html',
    directives: [RequestsListComponent, ConnectionsListComponent]
})
export class MyConnectionsComponent {

}
