import { baseUrl } from "../urls";

export async function getAllPersons() {
    const res = await fetch(`${baseUrl}/person/all`);
    
    if (!res.ok)
        throw new Error("Get all persons");

    return res.json();
}

export async function getPersonById(id: number) {
    const res = await fetch(`${baseUrl}/person/id/${id}`);

    if (!res.ok)
        throw new Error("Person not found.");

    return res.json();
}
