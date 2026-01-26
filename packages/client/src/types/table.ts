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
    NewApp = 'New Application',
    Edit = 'Edit',
    Delete = 'Delete',
    CancelApp = 'Cancel Application',

    Vision = 'Schedule Vision Test',
    Written = 'Schedule Written Test',
    Street = 'Schedule Street Test',

    IssueLicense = 'Issue Driving License (first time)',
    ShowLicense = 'Show License',
    ShowHistory = 'Show Person License History'
}

export enum TestAppoitnmentsActionType {
    Edit = 'Edit',
    TakeTest = 'Take Test'
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
    isDisabled?: (row: RowType) => boolean;
};

export type ActiveRowAction<RowType, RowActionType> = {
    row: RowType;
    type: RowActionType;
} | null;