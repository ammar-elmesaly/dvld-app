import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllLicenseClasses() {
    const res = await apiFetch(`${baseUrl}/licenseClass/all`);

    return res.json();
}

export async function getLicenseClassByName(systemName: string) {
    const res = await apiFetch(`${baseUrl}/licenseClass/name/${systemName}`);

    return res.json();
}