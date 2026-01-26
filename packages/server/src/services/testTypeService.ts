import { TestType } from "../entities/TestType";

export function getAllTestTypes() {
    return TestType.find();
}

export function getTestTypeById(testTypeId: number) {
    return TestType.findOneBy({ id: testTypeId });
}