import { TestTypeSystemName } from "@dvld/shared/src/dtos/testType.dto";
import { TestType } from "../entities/TestType";

export function getAllTestTypes() {
    return TestType.find({
        order: {
            sequence_order: 'ASC'
        }
    });
}

export function getTestTypeById(testTypeId: number) {
    return TestType.findOneBy({ id: testTypeId });
}

export function getTestTypeByName(systemName: TestTypeSystemName) {
    return TestType.findOneBy({ system_name: systemName });
}