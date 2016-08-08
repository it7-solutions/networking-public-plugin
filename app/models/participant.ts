import {Request} from "./request";
import {Connection} from "./connection";

export interface Participant {
    registration_id: number;
    fname: string;
    lname: string;
    email: string;
    company: string;
    language?: string;
    area_of_expertise?: string;

    _request?: Request;
    _connection?: Connection;
    _hidden: boolean;
    _filteredOut: boolean;
    _expanded: boolean;
    _search: string;
}