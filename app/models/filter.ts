export enum FilterMultiLogic { And, Or }

export interface Filter {
    label: string;
    field: number;
    values: FilterValue[];
    value?: any;
    multi?: boolean;
    multiLogic?: FilterMultiLogic;
}

export interface FilterValue {
    label: string;
    key: string;
}