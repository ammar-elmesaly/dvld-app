import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllLocalDrivingLicenseApplications() {
    const res = await apiFetch(`${baseUrl}/application/all/local`);

    return res.json();
}

export async function getAllInternationalDrivingLicenseApplications() {
    const res = await apiFetch(`${baseUrl}/application/all/international`);

    return res.json();
}