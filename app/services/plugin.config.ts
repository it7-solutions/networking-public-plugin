import {Injectable} from "@angular/core";

export interface PluginOptions {
    getListsUrl: string
    createRequestUrl: string
    acceptRequestUrl: string
    rejectRequestUrl: string
    participantId: number
    participantsPerPage: number
    participantsSortBy: string
    participantsSortDesc: boolean
}

@Injectable()
export class PluginConfig {
    getListsUrl: string;
    createRequestUrl: string;
    acceptRequestUrl: string;
    rejectRequestUrl: string;
    participantId: number;
    participantsPerPage: number;
    participantsSortBy: string;
    participantsSortDesc: boolean;

    constructor(options:PluginOptions) {
        this.getListsUrl = options.getListsUrl;
        this.createRequestUrl = options.createRequestUrl;
        this.acceptRequestUrl = options.acceptRequestUrl;
        this.rejectRequestUrl = options.rejectRequestUrl;
        this.participantId = options.participantId;
        this.participantsPerPage = options.participantsPerPage;
        this.participantsSortBy = options.participantsSortBy;
        this.participantsSortDesc = options.participantsSortDesc;
    }
}