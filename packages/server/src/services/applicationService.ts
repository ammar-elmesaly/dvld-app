import { ApplicationRepo } from "../repositories/ApplicationRepo";

export function getAllApplications() {
    return ApplicationRepo.find();
}