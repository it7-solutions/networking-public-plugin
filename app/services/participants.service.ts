import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Participant} from "../models/participant";

@Injectable()
export class ParticipantsService {
    private participants: Participant[];
    private _onUpdate: BehaviorSubject<Participant[]>;
    public onUpdate: Observable<Participant[]>;

    constructor() {
        this.participants = [];
        this._onUpdate = new BehaviorSubject([]);
        this.onUpdate = this._onUpdate.asObservable();
    }

    setParticipants(participants:Participant[]){
        this.participants = participants;
        this._onUpdate.next(this.participants);
    }

    getParticipants(): Participant[]{
        return this.participants;
    }
}