import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from "./it7-error.service";
import {It7AjaxService} from './it7-ajax.service'
import {Participant} from '../models/participant'
import {Request} from '../models/request'
import {Connection} from '../models/connection'
import {ParticipantsService} from './participants.service';
import {RequestsService} from './requests.service';
import {ConnectionsService} from './connections.service'
import { PopupService, BasePopup } from '../services/popup.service';
import { BusyPopup } from '../components/busy-popup.component';

@Injectable()
export class DataManagerService {
    private participantId: number;
    private popup: BusyPopup;

    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private participants: ParticipantsService,
        private requests: RequestsService,
        private connections: ConnectionsService,
        private it7Ajax:It7AjaxService,
        private popupService:PopupService
    ){
        this.participantId = config.participantId
    }

    initData(): Promise<any> {
        //return this._getLists().then(data => this.syncData(data));
        this.showLoading();
        return this.it7Ajax
            .post(this.config.getListsUrl, {})
            .then(data => this.syncData(data));
    }

    sendRequest(participantId:number, message: string){
        this.showLoading();
        return this.it7Ajax
            .post(this.config.createRequestUrl, {message: message, participant_id: participantId})
            .then(data => this.syncData(data));
    }

    acceptRequest(requestId:number){
        this.showLoading();
        return this.it7Ajax
            .post(this.config.acceptRequestUrl, {request_id: requestId})
            .then(data => this.syncData(data));
    }

    rejectRequest(requestId:number){
        this.showLoading();
        return this.it7Ajax
            .post(this.config.rejectRequestUrl, {request_id: requestId})
            .then(data => this.syncData(data));
    }

    private syncData(data: any){
        var participants = DataManagerService.normalizeParticipants(data, this.config.searchField);
        var requests = DataManagerService.normalizeRequests(data, this.participantId);
        var connection = DataManagerService.normalizeConnections(data, this.participantId);

        this.linkData(participants, requests, connection);

        this.participants.setParticipants(participants);
        this.requests.setRequests(requests);
        this.connections.setConnections(connection);

        this.hideLoading();
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

    private static normalizeParticipants(data: any, searchField: string): Participant[] {
        if(data && data.participant && _.isArray(data.participant)){
            return _.each(data.participant, (raw:Participant) => {
                var v = raw[searchField];
                raw._search = typeof v == 'string' ? v.toLowerCase() : '';
                return raw;
            }) as Participant[];
        } else {
            return [];
        }
    }

    private static normalizeRequests(data: any, id: number): Request[] {
        if(data && data.request && _.isArray(data.request)){
            return _.each(data.request, (raw: Request) => {
                var isIncoming = raw.requested_id === id;
                var isPending = raw.status === 'pending';
                raw._participant_id = isIncoming ?  raw.registration_id : raw.requested_id;
                raw._isVisible = isPending && isIncoming;
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

    private showLoading(){
        this.popup = new BusyPopup();
        this.popupService.showPopup(this.popup);
    }

    private hideLoading(){
        this.popup.visible = false;
        this.popupService.showPopup(this.popup);
        this.popup = undefined;
    }
}