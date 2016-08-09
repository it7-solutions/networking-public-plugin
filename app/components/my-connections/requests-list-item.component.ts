import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import {Request} from "../../models/request";
import {DataManagerService} from "../../services/data-manager.service";
import { PopupService } from "../../services/popup.service";
import {RequestPopup} from "../request-popup.component";
import {ConfirmPopup} from "../confirm-popup.component";

@Component({
    selector: 'requests-list-item',
    templateUrl: '/app/templates/requests-list-item.html'
})
export class RequestsListItemComponent {
    @Input() request: Request;

    constructor(
      private dataManager: DataManagerService,
      private requestPopupService: PopupService
    ) {}

    onAcceptClick(){
        this.dataManager.acceptRequest(this.request.id);
    }

    onRejectClick(){
        this.dataManager.rejectRequest(this.request.id);
    }

    onRejectClickConfirm(){
      console.log('confirm popup');
      var popup = new ConfirmPopup(this.request);
      this.requestPopupService.showPopup(popup);
    }

}
