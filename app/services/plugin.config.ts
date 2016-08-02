import {Injectable} from "@angular/core";

import { Filter } from "../models/filter";

export interface PluginOptions {
    getListsUrl: string
    createRequestUrl: string
    acceptRequestUrl: string
    rejectRequestUrl: string
    participantId: number
    participantsPerPage: number
    participantsSortBy: string
    participantsSortDesc: boolean
    filters: Filter[]
    searchField: string
    translations: any[]
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
    filters: Filter[];
    searchField: string;
    translations: any[];

    constructor(options:PluginOptions) {
        this.getListsUrl = options.getListsUrl;
        this.createRequestUrl = options.createRequestUrl;
        this.acceptRequestUrl = options.acceptRequestUrl;
        this.rejectRequestUrl = options.rejectRequestUrl;
        this.participantId = options.participantId;
        this.participantsPerPage = options.participantsPerPage;
        this.participantsSortBy = options.participantsSortBy;
        this.participantsSortDesc = options.participantsSortDesc;
        this.filters = options.filters;
        this.searchField = options.searchField;
        this.translations = options.translations;
    }
}