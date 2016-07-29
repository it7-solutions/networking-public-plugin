import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {Participant} from "../models/participant";

@Injectable()
export class ParticipantsService {
    private participants: Participant[];
    public onUpdate: Observable<Participant[]>;
    private updateObserver: Observer<Participant[]>;

    constructor() {
        this.participants = [];
        //this.participantUpdate = new Observable(observer => this.updateObserver = observer);
        this.onUpdate = new Observable((observer: any) => this.updateObserver = observer);
    }

    setParticipants(participants:Participant[]){
        this.participants = participants;
        console.log('setParticipants',this.participants.length);
        this.updateObserver.next(this.participants);
    }

    getParticipants(): Participant[]{
        console.log('getParticipants',this.participants.length);
        return this.participants;
    }
}