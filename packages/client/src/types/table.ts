export enum PeopleActionType {
    View = 'View',
    NewPerson = 'Add a new Person',
    Edit = 'Edit',
    Delete = 'Delete',
    Email = 'Send Email',
    Call = 'Phone Call'
}

export enum UserActionType {
    View = 'View',
    NewUser = 'Add a new User',
    Edit = 'Edit',
    Delete = 'Delete',
    Email = 'Send Email',
    Call = 'Phone Call'
}

export enum ApplicationsActionType {
    View = 'View',
    NewApp = 'Make a new application',
    Edit = 'Edit',
    Delete = 'Delete'
}

export enum ApplicationTypesActionType {
    Edit = 'Edit'
}

export enum TestTypesActionType {
    Edit = 'Edit'
}

export type RowActionDef<RowType, RowActionType> = {
    type: RowActionType;
    handler: (row: RowType) => void;
};

export type ActiveRowAction<RowType, RowActionType> = {
    row: RowType;
    type: RowActionType;
} | null;
