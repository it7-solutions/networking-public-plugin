import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from "./it7-error.service";
// import {It7AjaxService} from './it7-ajax.service'
import {Participant} from '../models/participant'
import {Request} from '../models/request'
import {Connection} from '../models/connection'
import {ParticipantsService} from './participants.service';
import {RequestsService} from './requests.service';
import {ConnectionsService} from './connections.service'
import {connect} from "net";

@Injectable()
export class DataManagerService {
    private mod: string;
    private participantId: number;

    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private participants: ParticipantsService,
        private requests: RequestsService,
        private connections: ConnectionsService
//       private it7Ajax:It7AjaxService,
    ){
        this.participantId = config.participantId
    }

    initData(): Promise<any> {
        this.mod = 'OR ';
        return this.getLists().then(data => this.syncData(data));
    }

    reinitData(): Promise<any> {
        this.mod = 'MOD ';
        return this.getLists().then(data => this.syncData(data));
    }

    private getLists():Promise<any> {
        //return Promise.resolve(this.it7Ajax.post(this.config.getListsUrl, {}));
        return Promise.resolve(this.getMockData());
    }

    private syncData(data: any){
        var participants = DataManagerService.normalizeParticipants(data);
        var requests = DataManagerService.normalizeRequests(data, this.participantId);
        var connection = DataManagerService.normalizeConnections(data, this.participantId);

        this.linkData(participants, requests, connection);

        this.participants.setParticipants(participants);
        this.requests.setRequests(requests);
        this.connections.setConnections(connection);

        console.log('syncData finish == ', data);
    }

    private linkData(participants:Participant[], requests:Request[], connections:Connection[]) {
        var participantsById = {};
        _.each(participants, (p:Participant) => {
            participantsById[p.registration_id] = p;
        });

        _.each(requests, (r: Request) => {
            var participant = participantsById[r._participant_id];
            if(participant){
                r._participant = participant;
                participant._request = r;
            } else {
                this.err.fire('Critical error: No Participant found with the specified id(' + r._participant_id
                    + ') for the connection with the Request(#' + r.id + ')');
            }
        });

        _.each(connections, (c: Connection) => {
            var participant = participantsById[c._participant_id];
            if(participant){
                c._participant = participant;
                participant._connection = c;
            } else {
                this.err.fire('Critical error: No Participant found with the specified id(' + c._participant_id
                    + ') for the connection with the Connection(#' + c.id + ')');
            }
        });
    }

    private static normalizeParticipants(data: any): Participant[] {
        if(data && data.participant && _.isArray(data.participant)){
            return _.each(data.participant, raw => raw) as Participant[];
        } else {
            return [];
        }
    }

    private static normalizeRequests(data: any, id: number): Request[] {
        if(data && data.request && _.isArray(data.request)){
            return _.each(data.request, (raw: Request) => {
                raw._isIncoming = raw.requested_id === id;
                raw._participant_id = raw._isIncoming ?  raw.registration_id : raw.requested_id;
                return raw;
            }) as Request[];
        } else {
            return [];
        }
    }

    private static normalizeConnections(data: any, id: number): Connection[] {
        if(data && data.connections && _.isArray(data.connections)){
            return _.each(data.connections, (raw: Connection) => {
                var isIncoming = raw.requested_id === id;
                raw._participant_id = isIncoming ?  raw.registration_id : raw.requested_id;
                return raw;
            }) as Connection[];
        } else {
            return [];
        }
    }

    private getMockData():any {
        var mod = this.mod;
        var areas = ['relax','golf','rock','diving','dream','movie'];
        return {
            participant: _.map(_.range(30), function(n){

                return {
                    company: mod + "Company for " + n,
                    email: n + "@co.com",
                    fname: n + (Math.random()>0.5 ? "man" : 'girl'),
                    lname: "family of " + n,
                    language: Math.random()>0.5 ? 'ua-ua' : 'ca-fr',
                    area_of_expertise: _.filter(areas,function(){return Math.random()>0.5}),
                    registration_id: n
                }
            }),
            request: [
                {
                    'id': 1,
                    'registration_id': 10,
                    'requested_id': 11,
                    'status': 'pending',
                    'message': 'I\'m 10. You - 11. Please...'
                },
                {
                    'id': 2,
                    'registration_id': 12,
                    'requested_id': 10,
                    'status': 'pending',
                    'message': 'I\'m 12. You - 10. Please...'
                },
                {
                    'id': 3,
                    'registration_id': 13,
                    'requested_id': 10,
                    'status': 'accepted',
                    'message': 'I\'m 12. You - 10. Please...'
                },
                {
                    'id': 4,
                    'registration_id': 10,
                    'requested_id': 14,
                    'status': 'accepted',
                    'message': 'I\'m 10. You - 14. Please...'
                }
            ],
            connections: [
                {
                    'id': 1,
                    'request_id': 3,
                    'registration_id': 13,
                    'requested_id': 10,
                    'status': 'unknown'
                },
                {
                    'id': 2,
                    'request_id': 4,
                    'registration_id': 10,
                    'requested_id': 14,
                    'status': 'unknown'
                }
            ]
        };

    }
}