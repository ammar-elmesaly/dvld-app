import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllLicenseClasses() {
    const res = await apiFetch(`${baseUrl}/licenseClass/all`);

    return res.json();
}