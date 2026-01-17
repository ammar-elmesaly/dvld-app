import { TestType } from "../entities/TestType";

export function getAllTestTypes() {
    return TestType.find();
}