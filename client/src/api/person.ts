import { baseUrl } from "./baseUrl";

export async function getAllPersons() {
    const res = await fetch(`${baseUrl}/person/all`);

    if (!res.ok)
        throw new Error("Sad :(");

    return res.json();
}