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

export enum ApplicationTypesActionType {
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
