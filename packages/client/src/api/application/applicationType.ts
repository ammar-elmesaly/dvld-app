import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllApplicationTypes() {
    const res = await apiFetch(`${baseUrl}/applicationType/all`);

    return res.json();
}