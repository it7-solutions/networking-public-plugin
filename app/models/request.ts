import { Participant } from '../models/participant';

export class Request {
    id: string;
    registration_id: number;
    requested_id: number;
    status: string;
    message: string;

    _isIncoming: boolean;
    _participant_id: number;
    _participant: Participant;
}