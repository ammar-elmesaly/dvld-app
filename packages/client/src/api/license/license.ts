import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getLicenseById(licenseId: number) {
    const res = await apiFetch(`${baseUrl}/license/id/${licenseId}`);

    return res.json();
}

export async function getLicenseWithPersonById(licenseId: number) {
    const res = await apiFetch(`${baseUrl}/license/id/${licenseId}?include=person`);

    return res.json();
}

export async function getAllLicensesWithDriverId(driverId: number) {
    const res = await apiFetch(`${baseUrl}/license/all/driverId/${driverId}`);

    return res.json();
}

export async function getAllDetainedLicenses() {
    const res = await apiFetch(`${baseUrl}/license/detained/all`);

    return res.json();
}

export async function getDetainedLicenseWithLicenseId(licenseId: number) {
    const res = await apiFetch(`${baseUrl}/license/detained/licenseId/${licenseId}`);

    return res.json();
}