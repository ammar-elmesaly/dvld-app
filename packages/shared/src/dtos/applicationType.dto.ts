export interface ApplicationTypeDTO {
    id: number;
    type_name: string;
    type_fees: number;
    default_validity_length?: number;
}

export enum ApplicationTypeSystemName {
    LocalLicenseService = 'LOCAL_LICENSE_SERVICE',
    RenewLicenseService = 'RENEW_LICENSE_SERVICE',
    ReplaceLostService = 'REPLACE_LOST_SERVICE',
    ReplaceDamagedService = 'REPLACE_DAMAGED_SERVICE',
    ReleaseDetainedService = 'RELEASE_DETAINED_SERVICE',
    RetakeTestService = 'RETAKE_TEST_SERVICE',
    InternationalLicenseService = 'INTERNATIONAL_LICENSE_SERVICE'
}