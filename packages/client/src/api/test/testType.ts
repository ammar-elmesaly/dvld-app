import { baseUrl } from "../urls";
import { apiFetch } from "../apiFetch";

export async function getAllTestTypes() {
    const res = await apiFetch(`${baseUrl}/testType/all`);

    return res.json();
}

export async function getTestTypeById(testTypeId: number) {
    const res = await apiFetch(`${baseUrl}/testType/${testTypeId}`);

    return res.json();
}

export async function getTestTypeByName(systemName: string) {
    const res = await apiFetch(`${baseUrl}/testType/name/${systemName}`);

    return res.json();
}