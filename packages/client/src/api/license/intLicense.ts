import { apiFetch } from "../apiFetch";
import { baseUrl } from "../urls";

export async function getAllInternationalLicensesWithDriverId(driverId: number) {
    const res = await apiFetch(`${baseUrl}/internationalLicense/all/driverId/${driverId}`);

    return res.json();
}