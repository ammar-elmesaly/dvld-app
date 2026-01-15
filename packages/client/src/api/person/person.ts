import { baseUrl } from "../urls";

export async function getAllPersons() {
    const res = await fetch(`${baseUrl}/person/all`);
    
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg);
    }

    return res.json();
}

export async function getPersonById(id: number) {
    const res = await fetch(`${baseUrl}/person/id/${id}`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg);
    }

    return res.json();
}

export async function getPersonByNationalId(nationalId: number) {
    const res = await fetch(`${baseUrl}/person/nid/${nationalId}`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg);
    }

    return res.json();
}