import {Injectable} from "@angular/core";

export interface PluginOptions {
    getListsUrl: string
    createRequestUrl: string
    acceptRequestUrl: string
    rejectRequestUrl: string
}

@Injectable()
export class PluginConfig {
    getListsUrl: string;
    createRequestUrl: string;
    acceptRequestUrl: string;
    rejectRequestUrl: string;

    constructor(options:PluginOptions) {
        this.getListsUrl = options.getListsUrl;
        this.createRequestUrl = options.createRequestUrl;
        this.acceptRequestUrl = options.acceptRequestUrl;
        this.rejectRequestUrl = options.rejectRequestUrl;
    }
}