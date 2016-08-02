export interface Participant {
    registration_id: number;
    fname: string;
    lname: string;
    email: string;
    company: string;
    language?: string;
    area_of_expertise?: string;

    _hidden: boolean;
    _filteredOut: boolean;
}