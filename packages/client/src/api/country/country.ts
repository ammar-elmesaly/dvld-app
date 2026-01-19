import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllCountries() {
    const res = await apiFetch(`${baseUrl}/country/all`);

    return res.json();
}