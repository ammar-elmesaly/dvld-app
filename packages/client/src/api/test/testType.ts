import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllTestTypes() {
    const res = await apiFetch(`${baseUrl}/testType/all`);r

    return res.json();
}