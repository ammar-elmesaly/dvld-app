export enum PeopleActionType {
    View = 'view',
    Edit = 'edit',
}

export type RowActionDef<RowType, RowActionType> = {
    type: RowActionType;
    handler: (row: RowType) => void;
};

export type ActiveRowAction<RowType, RowActionType> = {
    row: RowType;
    type: RowActionType;
} | null;
