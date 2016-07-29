import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { RequestsListItemComponent } from './requests-list-item.component';

@Component({
    selector: 'requests-list',
    templateUrl: '/app/templates/requests-list.html',
    directives: [RequestsListItemComponent]
})
export class RequestsListComponent {

}
