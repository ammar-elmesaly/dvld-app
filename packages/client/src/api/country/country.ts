import { baseUrl } from "../urls";

export async function getAllCountries() {
    const res = await fetch(`${baseUrl}/country/all`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.msg);
    }

    return res.json();
}