import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

// import {It7AjaxService} from './it7-ajax.service'
import {PluginConfig} from './plugin.config';
import {Participant} from '../models/participant'
import {Request} from '../models/request'
import {Connection} from '../models/connection'
import {ParticipantsService} from './participants.service';
import {RequestsService} from './requests.service';
import {ConnectionsService} from './connections.service'

@Injectable()
export class DataManagerService {
    private mod: string;
    private participantId: number;

    constructor(
        private config: PluginConfig,
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
        this.participants.setParticipants(DataManagerService.normalizeParticipants(data));
        this.requests.setRequests(DataManagerService.normalizeRequests(data, this.participantId));
        this.connections.setConnections(DataManagerService.normalizeConnections(data));
        console.log('syncData finish == ', data);
    }

    private static normalizeParticipants(data: any): Participant[] {
        if(data && data.participant && _.isArray(data.participant)){
            return _.each(data.participant, function(raw){
                return raw;
            }) as Participant[];
        } else {
            return [];
        }
    }

    private static normalizeRequests(data: any, id: number): Request[] {
        if(data && data.request && _.isArray(data.request)){
            return _.each(data.request, function(raw: Request){
                raw._isIncoming = raw.requested_id === id;
                return raw;
            }) as Request[];
        } else {
            return [];
        }
    }

    private static normalizeConnections(data: any): Connection[] {
        if(data && data.connections && _.isArray(data.connections)){
            return _.each(data.connections, function(raw){
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