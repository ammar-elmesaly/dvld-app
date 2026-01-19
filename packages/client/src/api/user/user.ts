import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllUsers() {
    const res = await apiFetch(`${baseUrl}/user/all`);

    return res.json();
}