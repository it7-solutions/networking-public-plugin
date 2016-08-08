import {
    Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef,
    Renderer
} from '@angular/core';

import { RequestPopupService, RequestPopup } from '../services/request-popup.service';
import { It7ErrorService } from '../services/it7-error.service';
import { DataManagerService } from '../services/data-manager.service';

@Component({
    selector: 'request-popup',
    templateUrl: '/app/templates/request-popup.html'
})
export class RequestPopupComponent {
    popup: RequestPopup;
    styleLeft: string;
    styleTop: string;

    constructor(
        private err: It7ErrorService,
        private requestPopupService: RequestPopupService,
        private dataManager: DataManagerService,
        private window: Window
    ) {
        this.requestPopupService.popup.subscribe(popup => this.showPopup(popup));
    }

    showPopup(popup: RequestPopup){
        if(popup){
            this.popup = popup;
            this.centerPopup();
        } else {
            this.err.fire('Error: Cannon show Request popup because not enough data');
        }
    }

    onSendClick(){
        this.dataManager.sendRequest(this.popup.recipient.registration_id, this.popup.message);
        this.popup = undefined;
    }

    onCancelClick(){
        this.popup = undefined;
    }

    private centerPopup(){
        console.log('centerPopup');
        this.styleTop = (this.window.innerHeight - 450) / 2 + "px";
        this.styleLeft = (this.window.innerWidth - 800) / 2 + "px";
    }
}
