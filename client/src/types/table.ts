export enum PeopleActionType {
    View = 'View',
    NewPerson = 'Add a new Person',
    Edit = 'Edit',
    Delete = 'Delete',
    Email = 'Send Email',
    Call = 'Phone Call'
}

export type RowActionDef<RowType, RowActionType> = {
    type: RowActionType;
    handler: (row: RowType) => void;
};

export type ActiveRowAction<RowType, RowActionType> = {
    row: RowType;
    type: RowActionType;
} | null;
