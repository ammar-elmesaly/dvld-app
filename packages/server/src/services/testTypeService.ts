import { TestType } from "../entities/TestType";

export function getAllTestTypes() {
    return TestType.find();
}

export function getTestTypeById(testTypeId: number) {
    return TestType.findOneBy({ id: testTypeId });
}

export function getTestTypeByName(systemName: string) {
    return TestType.findOneBy({ system_name: systemName });
}