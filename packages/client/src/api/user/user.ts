import { baseUrl } from "../urls";

export async function getAllUsers() {
    const res = await fetch(`${baseUrl}/user/all`);
    
    if (!res.ok)
        throw new Error("Unexpected error");

    return res.json();
}