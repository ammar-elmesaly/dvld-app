import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllDrivers() {
    const res = await apiFetch(`${baseUrl}/driver/all`);

    return res.json();
}