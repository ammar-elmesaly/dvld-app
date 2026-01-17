import { ApplicationType } from "../entities/ApplicationType";

export function getAllApplicationTypes() {
    return ApplicationType.find();
}