import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Request} from "../models/request";

@Injectable()
export class RequestsService {
    private requests: Request[];
    private _onUpdate: BehaviorSubject<Request[]>;
    public onUpdate: Observable<Request[]>;

    constructor() {
        this.requests = [];
        this._onUpdate = new BehaviorSubject([]);
        this.onUpdate = this._onUpdate.asObservable();

    }

    setRequests(requests:Request[]){
        this.requests = requests;
        console.log('setParticipants !!!!!',this.requests.length);
        this._onUpdate.next(this.requests);
    }

    getRequests(): Request[]{
        console.log('getRequests',this.requests.length);
        return this.requests;
    }
}