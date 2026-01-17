import { baseUrl } from "../urls";

export async function getAllApplicationTypes() {
    const res = await fetch(`${baseUrl}/applicationType/all`);
    
    if (!res.ok)
        throw new Error("Unexpected error");

    return res.json();
}