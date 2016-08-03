import {Participant} from "./participant";

export class Connection {
    id: string;
    request_id: number;
    registration_id: number;
    requested_id: number;
    status: string;

    _participant_id: number;
    _participant: Participant;
}