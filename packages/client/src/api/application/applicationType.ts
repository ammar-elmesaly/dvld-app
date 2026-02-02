import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllApplicationTypes() {
    const res = await apiFetch(`${baseUrl}/applicationType/all`);

    return res.json();
}

export async function getApplicationTypeByName(systemName: string) {
    const res = await apiFetch(`${baseUrl}/applicationType/name/${systemName}`);

    return res.json();
}