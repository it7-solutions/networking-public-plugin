import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs/Rx";

import {Participant} from "../models/participant";

export interface RequestPopup {
    recipient: Participant
    message?:string
}

@Injectable()
export class RequestPopupService {
    private _popup: Subject<RequestPopup>;
    public popup: Observable<RequestPopup>;

    constructor() {
        this._popup = new Subject<RequestPopup>();
        this.popup = this._popup.asObservable();
    }

    showPopup(popup: RequestPopup){
        this._popup.next(popup);
    }
}