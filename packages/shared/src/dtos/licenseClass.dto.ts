export interface LicenseClassDTO {
    id: number;
    class_name: string;
    class_description: string;
    class_fees: number;
    minimum_allowed_age: number;
    default_validity_length: number;
}

export enum LicenseClassSystemName {
    SmallMotor = 'CLASS_1',
    HeavyMotor = 'CLASS_2',
    Ordinary = 'CLASS_3',
    Commercial = 'CLASS_4',
    Agricultural = 'CLASS_5',
    Bus = 'CLASS_6',
    Truck = 'CLASS_7'
}