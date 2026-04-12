import { apiFetch } from '../apiFetch.js';
import { baseUrl } from '../urls.js';

export async function getAllInternationalLicensesWithDriverId(driverId: number) {
    const res = await apiFetch(`${baseUrl}/internationalLicense/all/driverId/${driverId}`);

    return res.json();
}

export async function getInternationalLicenseById(id: number) {
    const res = await apiFetch(`${baseUrl}/internationalLicense/${id}`);

    return res.json();
}