export interface Filter {
    label: string;
    field: number;
    values: FilterValue[];
    value?: any;
    multi?: boolean;
}

export interface FilterValue {
    label: string;
    key: string;
}