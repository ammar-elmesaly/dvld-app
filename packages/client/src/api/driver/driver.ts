import { baseUrl } from '../urls.js';
import { apiFetch } from '../apiFetch.js';

export async function getAllDrivers() {
    const res = await apiFetch(`${baseUrl}/driver/all`);

    return res.json();
}