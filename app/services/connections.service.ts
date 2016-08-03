import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs/Rx";

import {Connection} from "../models/connection";

@Injectable()
export class ConnectionsService {
    private connections: Connection[];
    private _onUpdate: BehaviorSubject<Connection[]>;
    public onUpdate: Observable<Connection[]>;

    constructor() {
        this.connections = [];
        this._onUpdate = new BehaviorSubject([]);
        this.onUpdate = this._onUpdate.asObservable();

    }

    setConnections(connections:Connection[]){
        this.connections = connections;
        console.log('setConnections',this.connections.length);
        this._onUpdate.next(this.connections);
    }

    getConnection(): Connection[]{
        console.log('getRequests',this.connections.length);
        return this.connections;
    }
}