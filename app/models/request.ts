import { Participant } from '../models/participant';

export class Request {
    id: number;
    registration_id: number;
    requested_id: number;
    status: string;
    message: string;

    _isVisible: boolean;
    _participant_id: number;
    _participant: Participant;
}