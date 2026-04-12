import { baseUrl } from '../urls.js';
import { apiFetch } from '../apiFetch.js';

export async function getAllCountries() {
    const res = await apiFetch(`${baseUrl}/country/all`);

    return res.json();
}