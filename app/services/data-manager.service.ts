import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';

import {PluginConfig} from './plugin.config';
import {Participant} from '../models/participant'
import {Request} from '../models/request'
import {Connection} from '../models/connection'
import {ParticipantsService} from './participants.service';
import {RequestsService} from './requests.service';
import {ConnectionsService} from './connections.service'

interface Response {

}

@Injectable()
export class DataManagerService {

    constructor(
        private config: PluginConfig,
        private participants: ParticipantsService,
        private requests: RequestsService,
        private connections: ConnectionsService
    ){}

    getLists():Promise<any> {
        return Promise.resolve();
    }

    initData(): Promise<any> {
        return Promise.resolve();
    }
}