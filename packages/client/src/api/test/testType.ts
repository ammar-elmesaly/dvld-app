import { baseUrl } from "../urls";

export async function getAllTestTypes() {
    const res = await fetch(`${baseUrl}/testType/all`);
    
    if (!res.ok)
        throw new Error("Unexpected error");

    return res.json();
}