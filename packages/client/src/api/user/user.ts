import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllUsers() {
    const res = await apiFetch(`${baseUrl}/user/all`);

    return res.json();
}

export async function getCurrentUser() {
    const res = await apiFetch(`${baseUrl}/me`);

    return res.json();
}

export async function logout() {
    const res = await apiFetch(`${baseUrl}/logout`,
        {
            method: 'POST'
        }
    );

    return res.status;
}