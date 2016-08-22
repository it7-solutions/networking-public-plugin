import {
    Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef,
    Renderer
} from '@angular/core';

import { PopupService, BasePopup } from '../services/popup.service';
import { It7ErrorService } from '../services/it7-error.service';
import { DataManagerService } from '../services/data-manager.service';
import { Participant } from '../models/participant';

export interface Window {
    // add some stuff here
}

export class RequestPopup extends BasePopup {
    recipient: Participant;
    message:string;
    isDone: boolean;

    constructor(recipient:Participant, message:string = '') {
        super('RequestPopup');
        this.recipient = recipient;
        this.message = message;
    }
}

@Component({
    selector: 'request-popup',
    templateUrl: '/app/templates/request-popup.html'
})
export class RequestPopupComponent {
    popup: RequestPopup;
    styleLeft: string;
    styleTop: string;
    overlayWidth: string;
    overlayHeight: string;
    private window: any;

    constructor(
        private err: It7ErrorService,
        private requestPopupService: PopupService,
        private dataManager: DataManagerService//,
        //private window: Window
    ) {
        this.requestPopupService.popup.subscribe(popup => this.checkPopup(popup));
        this.window = window;
    }

    private checkPopup(popup: BasePopup){
        if(popup instanceof RequestPopup){
            this.showPopup(popup as RequestPopup);
        }
    }

    private showPopup(popup: RequestPopup){
        if(popup){
            this.popup = popup;
            this.setOverlay();
            this.centerPopup();
        } else {
            this.err.fire('Error: Cannon show Request popup because not enough data');
        }
    }

    onSendClick(){
        this.dataManager
          .sendRequest(this.popup.recipient.registration_id, this.popup.message)
          .then( () => {
            this.popup.isDone = true;
          } );
    }

    onCancelClick(){
        this.popup = undefined;
    }

    private setOverlay(){
        this.overlayHeight = this.window.innerHeight + "px";
        this.overlayWidth = this.window.innerWidth + "px";
    }

    private centerPopup(){
        this.styleTop = (this.window.innerHeight - 450) / 2 + "px";
        this.styleLeft = (this.window.innerWidth - 800) / 2 + "px";
    }
}
