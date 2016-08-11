import {Injectable} from "@angular/core";

import { Filter } from "../models/filter";

export interface PluginOptions {
    getListsUrl: string
    createRequestUrl: string
    acceptRequestUrl: string
    rejectRequestUrl: string
    mockAJAX?: boolean
    participantId: number
    participantsPerPage: number
    participantsSortBy: string
    participantsSortDesc: boolean
    filters: Filter[]
    searchField: string
    translations: any[]
    onTranslate?: (code:string, text: string) => any
    templatesBaseUrl?: string
    onResetFilters?: () => void
    onInitFilters?: () => void
}

@Injectable()
export class PluginConfig {
    getListsUrl: string;
    createRequestUrl: string;
    acceptRequestUrl: string;
    rejectRequestUrl: string;
    mockAJAX: boolean;
    participantId: number;
    participantsPerPage: number;
    participantsSortBy: string;
    participantsSortDesc: boolean;
    filters: Filter[];
    searchField: string;
    translations: any[];
    templatesBaseUrl: string;
    onResetFilters: () => void;
    onInitFilters: () => void;
    onTranslate: (code:string, text: string) => any;

    constructor(options:PluginOptions) {
        this.getListsUrl = options.getListsUrl;
        this.createRequestUrl = options.createRequestUrl;
        this.acceptRequestUrl = options.acceptRequestUrl;
        this.rejectRequestUrl = options.rejectRequestUrl;
        this.mockAJAX = options.mockAJAX;
        this.participantId = options.participantId;
        this.participantsPerPage = options.participantsPerPage;
        this.participantsSortBy = options.participantsSortBy;
        this.participantsSortDesc = options.participantsSortDesc;
        this.filters = options.filters;
        this.searchField = options.searchField;
        this.translations = options.translations;
        this.templatesBaseUrl = options.templatesBaseUrl;
        this.onResetFilters = typeof options.onResetFilters === 'function' ? options.onResetFilters : () => {};
        this.onInitFilters = typeof options.onInitFilters === 'function' ? options.onInitFilters : () => {};
        this.onTranslate = typeof options.onTranslate === 'function' ? options.onTranslate : () => {};
    }
}