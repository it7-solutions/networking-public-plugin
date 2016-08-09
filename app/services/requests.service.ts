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
        this._onUpdate.next(this.requests);
    }

    getRequests(): Request[]{
        return this.requests;
    }
}