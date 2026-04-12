import { TestTypeSystemName } from '@dvld/shared';
import { TestType } from '../entities/TestType.js';
import { AppError } from '../types/errors.js';

export function getAllTestTypes() {
    return TestType.find({
        order: {
            sequence_order: 'ASC'
        }
    });
}

export async function getTestTypeById(testTypeId: number) {
    const testType = await TestType.findOneBy({ id: testTypeId });
    if (!testType)
        throw new AppError('Test type not found', 404);

    return testType;
}

export function getTestTypeByName(systemName: TestTypeSystemName) {
    return TestType.findOneBy({ system_name: systemName });
}

export async function editTestTypeById(testTypeId: number, typeName: string, typeDescription: string, typeFees: number) {
    const testType = await getTestTypeById(testTypeId);

    Object.assign(testType, {
        type_name: typeName,
        type_description: typeDescription,
        type_fees: typeFees
    });

    const updatedTestType = await testType.save();
    
    return updatedTestType.id;
}