import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllLocalDrivingLicenseApplications() {
    const res = await apiFetch(`${baseUrl}/application/all/local`);

    return res.json();
}