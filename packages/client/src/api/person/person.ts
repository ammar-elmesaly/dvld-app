import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllPersons() {
    const res = await apiFetch(`${baseUrl}/person/all`);

    return res.json();
}

export async function getPersonById(id: number) {
    const res = await apiFetch(`${baseUrl}/person/id/${id}`);

    return res.json();
}

export async function getPersonByDriverId(driverId: number) {
    const res = await apiFetch(`${baseUrl}/person/driverId/${driverId}`);

    return res.json();
}

export async function getPersonByNationalId(nationalId: number) {
    const res = await apiFetch(`${baseUrl}/person/nid/${nationalId}`);

    return res.json();
}